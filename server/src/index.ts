import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, type Part } from '@google/generative-ai';

dotenv.config();

const server: FastifyInstance = Fastify({
  logger: true,
  bodyLimit: 10485760 // Limit 10MB
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST']
});

server.get('/health', async () => {
  return { status: 'OK', message: 'Backend Pencatat Belanja Aktif (Gemini 3.1 FL)' };
});

server.post('/api/scan', async (request, reply) => {
  try {
    const { imageBase64 } = request.body as { imageBase64: string };
    if (!imageBase64) {
      return reply.code(400).send({ error: 'Payload imageBase64 tidak ditemukan' });
    }

    // Ekstraksi data murni base64 jika ada prefix data:image/...;base64,
    const baseData = imageBase64.includes('base64,') 
      ? (imageBase64.split('base64,')[1] || '') 
      : imageBase64;

    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

    const prompt = `Analisis struk belanja ini. Ekstrak daftar barang yang dibeli beserta harganya, lalu keluarkan DALAM FORMAT JSON murni tanpa markdown. 
Format yang diharapkan:
{
  "items": [{ "name": "nama barang", "price": angka integer }],
  "total": angka integer total
}`;

    const imageParts: Part[] = [
      {
        inlineData: {
          data: baseData,
          mimeType: "image/jpeg"
        }
      }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();
    
    // Normalisasi sanitize JSON (buang blok text markdown jika bocor)
    const sanitizedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(sanitizedText);

    return reply.send({
      success: true,
      data: parsedData
    });

  } catch (error: any) {
    server.log.error(error);
    return reply.code(500).send({ 
      error: 'Kegagalan Pemrosesan AI', 
      details: error.message 
    });
  }
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server API Gemini berjalan di port 3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
