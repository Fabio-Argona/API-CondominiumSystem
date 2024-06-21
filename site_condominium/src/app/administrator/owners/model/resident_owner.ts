export interface Resident_owner {
  id:                        string;
  nomeCompleto:              string;
  dataNascimento:            string;
  genero:                    string;
  estadoCivil:               string;
  email:                     string;
  telefone:                  string;
  enderecoCorrespondencia:   string;
  documentoIdentidade:       string;
  cpf:                       string;
  passaporte:                string;
  fotoUrl:                   string;
  unidade:                   string;
  dataInicioResidencia:      string;
  statusResidencia:          string;
  numeroMoradoresUnidade:    number;
  placaVeiculo:              string;
  modeloVeiculo:             string;
  corVeiculo:                string;
  vagaEstacionamento:        string;
  preferenciasContato:       string;
  observacoes:               string;
  registryUser:              string;
  // created: string; // You may adjust the type based on your date handling in Angular
  // updated: string; // You may adjust the type based on your date handling in Angular
}

