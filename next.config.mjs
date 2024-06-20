/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns:[
            // {
            //     protocol: 'https',
            //     hostname: 'templates.invoicehome.com',
            //     port: '',
            //     pathname: '/**'
            // },
            {
                protocol: 'https',
                hostname: '*',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
