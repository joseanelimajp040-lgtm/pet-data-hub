import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimalGeral, Animal } from "@/types/animal";
import { Calendar, User, Activity, Stethoscope } from "lucide-react";

interface AnimalGeralCardProps {
  animal: AnimalGeral;
  animalData?: Animal;
}

export const AnimalGeralCard = ({ animal, animalData }: AnimalGeralCardProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === "0000-00-00 00:00:00") return "N/A";
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="w-5 h-5" />
              {animalData?.nome || `Animal ID: ${animal.animal}`}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <Calendar className="w-4 h-4" />
              {formatDate(animal.data_criacao)}
              {animalData && (
                <span className="ml-2 text-xs">ID: {animal.animal}</span>
              )}
            </CardDescription>
          </div>
          <Badge variant={animal.status === "1" ? "default" : "secondary"}>
            {animal.status === "1" ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {animal.queixa_principal && (
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1 flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Queixa Principal
            </h4>
            <p className="text-foreground">{animal.queixa_principal}</p>
          </div>
        )}

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animal.ambiente && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Ambiente:</span>
              <p className="text-sm">{animal.ambiente}</p>
            </div>
          )}
          {animal.alimentacao && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Alimentação:</span>
              <p className="text-sm">{animal.alimentacao}</p>
            </div>
          )}
          {animal.vacinacao && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Vacinação:</span>
              <p className="text-sm">{animal.vacinacao}</p>
            </div>
          )}
          {animal.vermifugacao && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Vermifugação:</span>
              <p className="text-sm">{animal.vermifugacao}</p>
            </div>
          )}
        </div>

        {animal.procedimentos_realizados && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Procedimentos Realizados</h4>
              <p className="text-sm">{animal.procedimentos_realizados}</p>
            </div>
          </>
        )}

        {(animal.fc || animal.fr || animal.temperatura) && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Sinais Vitais
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {animal.fc && (
                  <div className="text-center p-2 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground">FC</p>
                    <p className="text-sm font-semibold">{animal.fc}</p>
                  </div>
                )}
                {animal.fr && (
                  <div className="text-center p-2 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground">FR</p>
                    <p className="text-sm font-semibold">{animal.fr}</p>
                  </div>
                )}
                {animal.temperatura && (
                  <div className="text-center p-2 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground">Temp</p>
                    <p className="text-sm font-semibold">{animal.temperatura}°C</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {animal.outras_observacoes && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Outras Observações</h4>
              <p className="text-sm whitespace-pre-wrap">{animal.outras_observacoes}</p>
            </div>
          </>
        )}

        <Separator />
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>Criado por: {animal.criado_por || "N/A"}</span>
        </div>
      </CardContent>
    </Card>
  );
};
