export default class Provider {
    private static instance: Provider
    private static HOST: string
    private static PORT: string
    private static PROTOCOL: string

    private constructor() {
        Provider.HOST = process.env['HOST'] ?? 'localhost'
        Provider.PORT = process.env['PORT'] ?? '3000'
        Provider.PROTOCOL = process.env['PROTOCOL'] ?? 'http'
    }

    public static getInstance(): Provider {
        if (Provider.instance === null || Provider.instance === undefined) {
            Provider.instance = new Provider()
        }
        return Provider.instance
    }

    public static getHost(): string {
        Provider.getInstance()
        return Provider.HOST
    }

    public static getPort(): string {
        Provider.getInstance()
        return Provider.PORT
    }

    public static getProtocol(): string {
        Provider.getInstance()
        return Provider.PROTOCOL
    }

    public static getAPIDomain(): string {
        Provider.getInstance()
        return `${Provider.PROTOCOL}://${Provider.HOST}:${Provider.PORT}`
    }
}