import Customer from "@/models/customerModel";


export default async function POST(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query; 

  // Get amount, type, and details from request body
  const { amount, type, details } = req.body;

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const newTransaction = { amount, type, details };
   
    customer.transactions.push(newTransaction);

   
    if (type === 'give') {
      customer.totalGive += amount;
    } else if (type === 'get') {
      customer.totalGet += amount;
    }


    await customer.save();

 
    return res.status(200).json(customer);
  } catch (err) {
   
    return res.status(500).json({ error: err.message });
  }
}
