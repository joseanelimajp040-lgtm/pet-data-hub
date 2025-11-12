export interface AnimalGeral {
  id: string;
  animal: string;
  queixa_principal: string;
  ambiente: string;
  ambientacao: string;
  alimentacao: string;
  vacinacao: string;
  vermifugacao: string;
  ectoparasitas: string;
  historico_reproducao: string;
  historica_medica: string;
  procedimentos_realizados: string;
  olhos_mucosa: string;
  cavidade_oral: string;
  tcp: string;
  hidratacao: string;
  orelhas_ouvido: string;
  linfonodos: string;
  pele_pelo: string;
  membros_toracidos: string;
  torax: string;
  membros_pelvicos: string;
  abdome: string;
  fc: string;
  fr: string;
  temperatura: string;
  outras_observacoes: string;
  retorno: string;
  data_criacao: string;
  criado_por: string;
  data_atualizacao: string;
  atualizado_por: string;
  status: string;
}

export interface AnimalLaudo {
  id: string;
  animal: string;
  bexiga: string;
  rins: string;
  ap_reprodutor: string;
  figado: string;
  vesicula_biliar: string;
  gastrointestinal: string;
  baco: string;
  pancreas: string;
  adrenais: string;
  linfonodos: string;
  aorta_veia: string;
  observacoes_laudogeral: string;
  retorno: string;
  data_criacao: string;
  criado_por: string;
  data_atualizacao: string;
  atualizado_por: string;
  status: string;
}

export interface FichaClinica {
  id: string;
  id_ficha: string;
  animal: string;
  tipo: string;
  data_criacao: string;
  data_retorno: string;
  status: string;
  idretorno: string;
}
