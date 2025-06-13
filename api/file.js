import axios from 'axios';

export default async function handler(req, res) {
  const { fileId } = req.query;
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

  if (!TELEGRAM_TOKEN || !fileId) {
    return res.status(400).send('Missing token or fileId');
  }

  try {
    const fileInfo = await axios.get(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/getFile?file_id=${fileId}`);
    const filePath = fileInfo.data.result.file_path;
    const telegramUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${filePath}`;

    return res.redirect(302, telegramUrl);
  } catch (err) {
    console.error('Failed to get file path:', err.message || err);
    return res.status(404).send('File not found or invalid ID');
  }
}