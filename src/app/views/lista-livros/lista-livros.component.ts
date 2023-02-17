import { LivrosResultado } from './../../models/interfaces';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap, throwError } from 'rxjs';
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
  mensagemErro = '';
  livrosResultado: LivrosResultado;

  constructor(private service: LivroService) {}

  totalDeLivros$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length > 3), // Só deixa seguir o fluxo para os outros métodos se a condição for verdadeira
    tap(() => console.log('Fluxo Inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map(resultado => this.livrosResultado = resultado)
  )

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length > 3), // Só deixa seguir o fluxo para os outros métodos se a condição for verdadeira
    tap(() => console.log('Fluxo Inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap((retornoApi) => console.log(retornoApi)),
    map((resultado) => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError(erro => {
      console.log(erro);
      return throwError(()=> new Error(this.mensagemErro = 'Ops, ocorreu um erro!'))
    })
  );

  livrosResultadoParaLivros(items) {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
