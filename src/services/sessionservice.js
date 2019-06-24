var sessionService = new function () {
    var serialNumber;

    function deserializeUser(encodedUser) {
        if (!encodedUser || encodedUser === null || encodedUser === '') {
            return undefined;
        }
        return JSON.parse(atob(encodedUser));
    }

    function getSerialNumber() {
        if (!serialNumber || serialNumber === null || serialNumber === '') {
            serialNumber = sessionStorage.getItem("SerialNumber");
        }
        return serialNumber;
    }

    this.createSession = (data) => {
        this.destroySession();
        serialNumber = new Date().getTime();
        sessionStorage.setItem("SerialNumber", serialNumber);
        sessionStorage.setItem(serialNumber, data);
        return true;
    }

    this.getCurrentUserId = () => {
        if (!getSerialNumber() || getSerialNumber() === null || !getSerialNumber() === '') {
            return undefined;
        }
        return deserializeUser(sessionStorage.getItem(getSerialNumber())).user.id;
    }

    this.getUserFullName = () => {
        if (!getSerialNumber() || getSerialNumber() === null || !getSerialNumber() === '') {
            return undefined;
        }

        return deserializeUser(sessionStorage.getItem(getSerialNumber())).user.firstName + " " + deserializeUser(sessionStorage.getItem(getSerialNumber())).user.lastName;
    }

    this.destroySession = () => {
        if (!getSerialNumber() || getSerialNumber() === null || !getSerialNumber() === '') {
            return;
        }
        sessionStorage.removeItem(getSerialNumber());
        sessionStorage.removeItem("SerialNumber");
    }

    this.isUserLogged = () => {
        if (!getSerialNumber() || getSerialNumber() === null || !getSerialNumber() === '') {
            return;
        }

        return true;
    }

    this.goToUserMainPage = (props) => {
        if(this.isUserLogged()) {
            props.history.push('/landingPage');
        } else {
            props.history.push('/login');
        }
    }
}();

export default sessionService;