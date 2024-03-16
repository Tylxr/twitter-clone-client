import { authFetchClient } from "../authFetch";

export default async function refreshToken() {
    try {
        await authFetchClient("/refresh");
    } catch (err) {
        console.error(err);
        console.error("Error trying to refresh prior to a core service request.");
    }
}
