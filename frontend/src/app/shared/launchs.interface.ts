import { itemLauch } from './item-lauch.interface';
import { LaunchControlTotal } from './launch-control-total.inteface';

export interface Launchs {
    totalControleLancamento: LaunchControlTotal;
    listaControleLancamento: itemLauch[];
    indice: number;
    tamanhoPagina: number;
    totalElements: number;
}
