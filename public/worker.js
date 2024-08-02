self.addEventListener('message', (event) => {
    const message = event.data;

    const response = `Received message: ${message}`;
    self.postMessage(response);
});