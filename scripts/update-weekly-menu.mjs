import admin from "firebase-admin";
import serviceAccount from "../service-account.json" with { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
}

const db = admin.firestore();

const menuItems = [
  {
    name: "Southwestern Chicken Bowl",
    description:
      "Grilled chicken, cilantro lime rice, black beans, corn, and homemade pico de gallo. Add avocado +$2 | shrimp +$5 | salmon +$7",
    price: 15,
    category: "chicken",
    imageUrl: "/images/herb_lemon_chicken.png",
    active: true,
    featured: true,
  },
  {
    name: "Southwest Shrimp Avocado Salad",
    description:
      "Fresh greens topped with chili lime shrimp, black beans, corn, pico de gallo, red onion, jalapeno, and avocado lime dressing. Chicken option $15 | Salmon option $18",
    price: 16,
    category: "salads",
    imageUrl: "/images/garlic_butter_shrimp.png",
    active: true,
    featured: true,
  },
  {
    name: "Chili Lime Salmon Plate",
    description:
      "Chili lime salmon, cilantro lime rice, black beans, sauteed corn, tomato, red onion, jalapeno, and avocado.",
    price: 19,
    category: "seafood",
    imageUrl: "/images/braised_short_rib.png",
    active: true,
    featured: true,
  },
];

async function main() {
  const existing = await db.collection("menuItems").get();
  const batch = db.batch();

  existing.docs.forEach((doc) => batch.delete(doc.ref));

  menuItems.forEach((item) => {
    const ref = db.collection("menuItems").doc();
    batch.set(ref, {
      ...item,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();

  const verify = await db.collection("menuItems").orderBy("name").get();
  console.log(`Updated menuItems: ${verify.size}`);
  verify.docs.forEach((doc) => {
    const data = doc.data();
    console.log(`- ${data.name} | $${data.price} | ${data.category}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
