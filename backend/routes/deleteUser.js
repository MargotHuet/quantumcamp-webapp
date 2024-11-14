import { supabaseAdmin } from '../backendSupabase.js';

export default async function deleteUser(req, res) {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const { error } = await supabaseAdmin.auth.api.deleteUser(userId);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'User deleted successfully' });
}
