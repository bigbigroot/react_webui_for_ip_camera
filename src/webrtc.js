import  'webrtc-adapter';
import { io } from 'socket.io-client';


function generateRandomId(){
    const base = 64;
    const convert64Code = [
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
        'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', '-', '_'
    ]
    let base64String = "";

    for(let i=0; i<16; i++){
        let rnd = Math.floor(Math.random()*base);
        base64String += convert64Code[rnd];
    }
    return base64String;
}

class SignalingChannel{
    constructor(){
        this.offererSessionId = '';
        this.answererSessionId = generateRandomId();
        this.currentSeq = 1;
        this.sdp = '';
    }

    startCall(){
        const auth_token = sessionStorage.getItem('token');
        this.socket = io("/webrtc",{
            auth: {
              token: auth_token
            }
        });
        
        this.socket.on('connect', ()=>{
            console.log('socketio id:', this.socket.id);
            this.socket.emit('call_offer');
        })

        this.socket.on('error', (error)=>{
            console.log('SingalingChannel Error: ', error);
        })

        this.socket.on('disconnect', (reason)=>{
            console.log('SingalingChannel Disconnect: ', reason);
        })

        this.socket.on("to_answer", (msg) => {
            const data = JSON.parse(msg)
            if(data.messageType == 'OFFER'){
                this.offererSessionId = data.offererSessionId;
                this.currentSeq = data.seq;
                this.remoteSdp = data.sdp;
                this.onRemoteSdp(data.sdp);
            }else if(data.messageType == 'OK'){
                // this.onClose();
            }

            console.log(data.sdp);
        });
    }


    sendAnswer(sdp){
        this.localSdp=sdp;
        let answerPacket= 
        {
            'messageType': 'ANSWER',
            'offererSessionId': this.offererSessionId,
            'answererSessionId': this.answererSessionId,
            'seq': this.currentSeq,
            'sdp': sdp
        }
        this.socket.emit('to_offer', JSON.stringify(answerPacket, null, 4));
    }

    shutdown(){
        if(this.offererSessionId.length > 0)
        {                
            let answerPacket= 
            {
                'messageType': 'SHUTDOWN',
                'offererSessionId': this.offererSessionId,
                'answererSessionId': this.answererSessionId,
                'seq': this.currentSeq
            }
            this.socket.emit('to_offer', JSON.stringify(answerPacket, null, 4));
        }
    }
}

export class Caller{
    constructor(player){
        this.player = player;
    }

    open(){
        const configuration = {iceServers: [{urls: "stun:192.168.5.6:3478"}]};
        
        this.signalingChannel = new SignalingChannel();
    
        this.signalingChannel.startCall();
    
        this.peerConnection = new RTCPeerConnection(configuration);
        // Listen for local ICE candidates on the local RTCPeerConnection
        this.peerConnection.addEventListener('icecandidate', event => {
            if (event.candidate) {
                // allCandidates.push(event.candidate.candidate);
            }
        });
    
        this.peerConnection.addEventListener("icecandidateerror", event=>{
            console.log(event);
        });
        
        this.peerConnection.addEventListener("icegatheringstatechange", event=>{                
            let connection = event.target;
    
            switch(connection.iceGatheringState)
            {
                case "new": break;
                case "gathering": break;
                case "complete":
                {
                    const sdp = connection.localDescription.sdp;
                    this.signalingChannel.sendAnswer(sdp);                
                }
            }
        });
    
        this.peerConnection.addEventListener("track", event => {
            if (this.player) {
                const videoDom = this.player.tech().el()
                // The stream groups audio and video tracks
                videoDom && (videoDom.srcObject = event.streams[0])
                this.player.play = () => {
                  videoDom.play()
                }
                this.player.play()
            }
        });
    
        this.signalingChannel.onRemoteSdp = sdp=>{
            const offer = new RTCSessionDescription({type: 'offer', sdp: sdp});
            this.peerConnection.setRemoteDescription(offer)
            .then(()=>{
                this.peerConnection.createAnswer()
                .then(value=>{
                    this.peerConnection.setLocalDescription(value)
                    .catch(reason=>{
                        console.error("Webrtc Error at setLocalDescription:", reason);
                    })
                });
            })
            .catch(reason=>{
                console.error("Webrtc Error at setRemoteDescription:", reason);
            });
        }

        this.signalingChannel.onClose = ()=>{
            this.peerConnection.close();
        }
    };

    close(){
        this.signalingChannel.shutdown();
    };
}
