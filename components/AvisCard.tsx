import { Card, CardContent } from "@/components/ui/Card";
import { formatDateFr } from "@/lib/utils";

interface Avis {
  id: string;
  auteur: string;
  note: number;
  commentaire: string;
  createdAt: Date | string;
}

interface AvisCardProps {
  avis: Avis;
}

export function AvisCard({ avis }: AvisCardProps) {
  const renderStars = (note: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < note ? "text-amber-400 fill-current" : "text-gray-300"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-charcoal-800">{avis.auteur}</h4>
            <p className="text-sm text-charcoal-600">
              {formatDateFr(avis.createdAt)}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(avis.note)}
          </div>
        </div>

        <blockquote className="text-charcoal-700 leading-relaxed">
          "{avis.commentaire}"
        </blockquote>
      </CardContent>
    </Card>
  );
}
