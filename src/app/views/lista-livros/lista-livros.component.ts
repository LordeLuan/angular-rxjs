import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from './../../service/livro.service';

const PAUSA = 3000;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();

  constructor(private service: LivroService) {}

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length > 3), // Só deixa seguir o fluxo para os outros métodos se a condição for verdadeira
    tap(() => console.log('Fluxo Inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap((retornoApi) => console.log(retornoApi)),
    map((items) => this.livrosResultadoParaLivros(items))
  );

  livrosResultadoParaLivros(items) {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
