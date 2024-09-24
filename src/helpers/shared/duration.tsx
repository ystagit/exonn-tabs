class Duration {

    timeout : any = null;

    isStarted() {
        return this.timeout !== null;
    }

    start(ms: number) {

        return new Promise((resolve) => {
            this.timeout = setTimeout(resolve, ms);
        });
    }

    stop() {
        clearTimeout(this.timeout);
        this.timeout = null;
    }

}

export default Duration;