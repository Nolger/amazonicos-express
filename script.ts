export const sendMensaje = (mensaje: string) => {
    const token = 'EAANMh7tBkooBO6zZC4MfGWIJnFaP4o2w7fdYmBiiZAztNGZApDZBJgsA2SWUU9D7tRzxP5m3abg2tGXN6pUiRbiqpPsN0QF8x6SRXM9B1DkPtE7R69GyJIVXBP8aMZAS5htLeIaQVaKEK1g1UJ4zsXP9ezD3qxff7DPT8DCTAoxGiIuNalrxWNzZCE1WSbyY1m67GknOvw0VLvL107CqVF2UEvXAZDZD';
    const phoneNumber = '573126613981';
    const message = 'Hola, este es un mensaje de prueba desde TypeScript!';

    const url = `https://api.chat-api.com/instance123456/sendMessage?token=${token}`;
    const data = {
        phone: phoneNumber,
        body: message,
    };

}