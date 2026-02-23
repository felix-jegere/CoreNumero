import dotenv from 'dotenv';
import testConnection from './config/ai_model.js';
import app from './app.js';

dotenv.config({
    path: './.env'
})

const startServer = async ()=>{
    try{
        console.log('\n🔢 Starting CoreNumero Server...');
        const ok = await testConnection();
        if(!ok){
            console.error('✗ Gemini API connection failed — aborting startup.');
            process.exit(1);
        }
        app.on('error', (error) => {
            console.error('Server error:', error);
            throw error; // Rethrow the error to be caught by the outer catch block
        });
        const backendPort = process.env.PORT || 8000;
        app.listen(backendPort, () => {
            console.log(`\n✓ Server is running on http://localhost:${backendPort}`);
            console.log('✓ Frontend available at http://localhost:3000');
            console.log('✓ API available at http://localhost:3000/api\n');
        });
    }catch(error){
        console.log("Error occurred: ", error)
        process.exit(1);
    }
} 

startServer();