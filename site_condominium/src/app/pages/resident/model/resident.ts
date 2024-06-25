
export interface Resident {
  id:                        string;
  nomeCompleto:              string;
  dataNascimento:            string;
  residentPayment: ResidentPayment[];
  genero:                    string;
  estadoCivil:               string;
  email:                     string;
  telefone:                  string;
  enderecoCorrespondencia:   string;
  documentoIdentidade:       string;
  cpf:                       string;
  password:                  string;
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

}


export interface ResidentPayment {
  dateForPayment: string;
  valuePayment: number;
  statusPayment: string;
  barcodeNumber: number;
  price: number;
  barcodeImage: number;
}

