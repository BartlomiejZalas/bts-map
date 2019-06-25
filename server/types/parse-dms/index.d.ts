declare module 'parse-dms' {
    const parseDMS: (dms: string) => { lat: number, lon: number };
    export default parseDMS;
}
