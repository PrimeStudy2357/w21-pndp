const { WebSocketServer } = require('ws');

/** 웹 소켓 서버 */
const wss = new WebSocketServer({ port: 8080 });

// 클라이언트가 소켓과 연결 됐을 시
wss.on('connection', function connection(ws, req) {
    /** 사용자 IP 주소 */
    const addr = req.socket.remoteAddress;

    // 소켓 사용 중의 이벤트 핸들러들

    // 소켓에 에러가 발생한 경우 (console.error에게 에러 출력 역할을 전가)
    ws.on('error', console.error);

    // 클라이언트로부터 메세지를 받을 시 echo
    ws.on('message', (data) => {
        console.log(`${addr} :: received: ${data.toString()}`);
        ws.send(`Server :: ${data.toString()}`);
    });

    // 연결 해제 시
    ws.on('close', () => {
        console.log(`${addr} :: Disconnected!`);
    });

    // 연결 성공 메시지 로깅 및 클라이언트에게 전달
    console.log(`${addr} :: Connected!`);
    ws.send(`You've been connected! || ${new Date()}`);
});