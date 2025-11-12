import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { AnimalGeralCard } from "@/components/AnimalGeralCard";
import { AnimalLaudoCard } from "@/components/AnimalLaudoCard";
import { AnimalGeral, AnimalLaudo, Animal } from "@/types/animal";
import { parseCSV } from "@/utils/csvParser";
import { Search, FileText, Activity, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [animaisGerais, setAnimaisGerais] = useState<AnimalGeral[]>([]);
  const [laudos, setLaudos] = useState<AnimalLaudo[]>([]);
  const [animaisMap, setAnimaisMap] = useState<Map<string, Animal>>(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [geralResponse, laudoResponse, animalResponse] = await Promise.all([
        fetch('/data/animal_geral.csv'),
        fetch('/data/animal_laudogeral.csv'),
        fetch('/data/animal.csv')
      ]);

      const geralText = await geralResponse.text();
      const laudoText = await laudoResponse.text();
      const animalText = await animalResponse.text();

      const geralData = parseCSV(geralText) as AnimalGeral[];
      const laudoData = parseCSV(laudoText) as AnimalLaudo[];
      const animalData = parseCSV(animalText) as Animal[];

      // Create a map of animal ID to animal data
      const map = new Map<string, Animal>();
      animalData.forEach(animal => {
        map.set(animal.id, animal);
      });

      setAnimaisGerais(geralData);
      setLaudos(laudoData);
      setAnimaisMap(map);

      toast({
        title: "Dados carregados com sucesso",
        description: `${geralData.length} registros gerais, ${laudoData.length} laudos e ${animalData.length} animais encontrados.`,
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados dos arquivos CSV.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAnimaisGerais = animaisGerais.filter(animal => {
    const animalData = animaisMap.get(animal.animal);
    const animalNome = animalData?.nome || '';
    
    return animal.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animalNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.queixa_principal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.criado_por?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredLaudos = laudos.filter(laudo => {
    const animalData = animaisMap.get(laudo.animal);
    const animalNome = animalData?.nome || '';
    
    return laudo.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animalNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laudo.criado_por?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">OnePet - Gestão Veterinária</h1>
              <p className="text-muted-foreground">Sistema de gerenciamento de dados clínicos</p>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar por ID do animal, queixa, ou responsável..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Carregando dados...</span>
          </div>
        ) : (
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="geral" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Fichas Gerais ({filteredAnimaisGerais.length})
              </TabsTrigger>
              <TabsTrigger value="laudos" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Laudos ({filteredLaudos.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="space-y-6">
              {filteredAnimaisGerais.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredAnimaisGerais.map((animal) => (
                    <AnimalGeralCard 
                      key={animal.id} 
                      animal={animal} 
                      animalData={animaisMap.get(animal.animal)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm ? "Nenhum registro encontrado para sua busca." : "Nenhuma ficha geral disponível."}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="laudos" className="space-y-6">
              {filteredLaudos.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredLaudos.map((laudo) => (
                    <AnimalLaudoCard 
                      key={laudo.id} 
                      laudo={laudo} 
                      animalData={animaisMap.get(laudo.animal)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Activity className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm ? "Nenhum laudo encontrado para sua busca." : "Nenhum laudo disponível."}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Index;
