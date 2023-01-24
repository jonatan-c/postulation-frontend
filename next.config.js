/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['probando-upload.s3.sa-east-1.amazonaws.com'],
		// remotePatterns: [
		//   {
		//     protocol: 'https:',
		//     hostname: 'probando-upload.s3.sa-east-1.amazonaws.com',
		//     port: 443,
		//     pathname: '/**/*',
		//   }
		// ],
	},
};

module.exports = nextConfig;
