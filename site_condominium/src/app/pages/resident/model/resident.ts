
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

  // constructor(data: Partial<Resident> = {}) {
  //   Object.assign(this, data);
  //   if (!this.residentPayment) {
  //     this.residentPayment = [];
  //   }
  // }
}

export interface ResidentPayment {
  dateForPayment: string;
  valuePayment: number;
  statusPayment: string;
  barcodeNumber: number;
  price: number;
  barcodeImage: number;
}

