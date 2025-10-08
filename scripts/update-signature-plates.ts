import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updatePlatsTags() {
  console.log("🏷️ Mise à jour des tags des plats signature...");

  try {
    // Mettre à jour le Bar en croûte de sel
    const barUpdate = await prisma.plat.updateMany({
      where: { nom: "Bar en croûte de sel aux herbes" },
      data: { tags: "specialite,sans_gluten,fait_maison" },
    });

    // Mettre à jour le Carré d'agneau
    const agneauUpdate = await prisma.plat.updateMany({
      where: { nom: "Carré d'agneau en croûte d'herbes" },
      data: { tags: "specialite,local,fait_maison" },
    });

    console.log(
      `✅ ${barUpdate.count} plat(s) "Bar en croûte de sel" mis à jour`
    );
    console.log(`✅ ${agneauUpdate.count} plat(s) "Carré d'agneau" mis à jour`);

    // Vérifier combien de plats ont maintenant le tag "specialite"
    const specialites = await prisma.plat.findMany({
      where: {
        disponible: true,
        tags: {
          contains: "specialite",
        },
      },
      select: { nom: true, prix: true },
    });

    console.log(
      `\n🍽️ Plats signature maintenant disponibles (${specialites.length}) :`
    );
    specialites.forEach((plat: any) => {
      console.log(`   - ${plat.nom} (${plat.prix}€)`);
    });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePlatsTags();
