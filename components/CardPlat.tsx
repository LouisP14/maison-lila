import { AllergeneBadge, TagBadge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";

interface Plat {
  id: string;
  nom: string;
  description: string;
  prix: number;
  tags: string;
  allergenes: string;
  image?: string;
  disponible: boolean;
}

interface CardPlatProps {
  plat: Plat;
}

export function CardPlat({ plat }: CardPlatProps) {
  const tags = plat.tags ? plat.tags.split(",").filter(Boolean) : [];
  const allergenes = plat.allergenes
    ? plat.allergenes.split(",").filter(Boolean)
    : [];

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-soft-lg ${!plat.disponible ? "opacity-75" : ""}`}
    >
      {plat.image && (
        <div className="aspect-video relative overflow-hidden bg-cream-100">
          <img
            src={plat.image}
            alt={plat.nom}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {!plat.disponible && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium bg-red-500 px-3 py-1 rounded-full text-sm">
                Indisponible
              </span>
            </div>
          )}
        </div>
      )}

      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-serif font-semibold text-lg text-charcoal-800 mb-2">
              {plat.nom}
            </h3>
            <p className="text-charcoal-600 text-sm leading-relaxed">
              {plat.description}
            </p>
          </div>
          <div className="ml-4 text-right">
            <p className="text-xl font-semibold text-sage-600">
              {formatPrice(plat.prix)}
            </p>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* Allergènes */}
        {allergenes.length > 0 && (
          <div className="pt-2 border-t border-sage-400/10">
            <p className="text-xs text-charcoal-600 mb-2">Allergènes :</p>
            <div className="flex flex-wrap gap-1">
              {allergenes.map((allergene) => (
                <AllergeneBadge key={allergene} allergene={allergene} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
