export default function authentication() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    let object = token !== null ? token : {};

    if (token !== null) {
        object.isAuthenticated = token.token ? true : false;
    }

    if (token === null) {
        object.isAuthenticated = false;
    }

    return object;
}