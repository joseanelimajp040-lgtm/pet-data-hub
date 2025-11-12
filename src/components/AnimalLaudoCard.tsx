import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimalLaudo, Animal } from "@/types/animal";
import { Calendar, User, FileText } from "lucide-react";

interface AnimalLaudoCardProps {
  laudo: AnimalLaudo;
  animalData?: Animal;
}

export const AnimalLaudoCard = ({ laudo, animalData }: AnimalLaudoCardProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === "0000-00-00 00:00:00") return "N/A";
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const laudoItems = [
    { label: "Bexiga", value: laudo.bexiga },
    { label: "Rins", value: laudo.rins },
    { label: "Ap. Reprodutor", value: laudo.ap_reprodutor },
    { label: "Fígado", value: laudo.figado },
    { label: "Vesícula Biliar", value: laudo.vesicula_biliar },
    { label: "Gastrointestinal", value: laudo.gastrointestinal },
    { label: "Baço", value: laudo.baco },
    { label: "Pâncreas", value: laudo.pancreas },
    { label: "Adrenais", value: laudo.adrenais },
    { label: "Linfonodos", value: laudo.linfonodos },
    { label: "Aorta/Veia", value: laudo.aorta_veia },
  ];

  const hasContent = laudoItems.some(item => item.value);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Laudo - {animalData?.nome || `Animal ID: ${laudo.animal}`}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <Calendar className="w-4 h-4" />
              {formatDate(laudo.data_criacao)}
              {animalData && (
                <span className="ml-2 text-xs">ID: {laudo.animal}</span>
              )}
            </CardDescription>
          </div>
          <Badge variant={laudo.status === "1" ? "default" : "secondary"}>
            {laudo.status === "1" ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasContent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {laudoItems.map((item, index) => 
              item.value ? (
                <div key={index} className="p-3 bg-accent rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm">{item.value}</p>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma informação de laudo disponível
          </p>
        )}

        {laudo.observacoes_laudogeral && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Observações</h4>
            <p className="text-sm bg-accent p-3 rounded-lg">{laudo.observacoes_laudogeral}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 pt-4 border-t">
          <User className="w-4 h-4" />
          <span>Criado por: {laudo.criado_por || "N/A"}</span>
        </div>
      </CardContent>
    </Card>
  );
};
