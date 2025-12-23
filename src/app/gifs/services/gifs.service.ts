import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = (): Record<string,Gif[]> => {
    const history = localStorage.getItem('searchHistory'); //trae el json
    return history ? JSON.parse(history) : {};
}

@Injectable({providedIn: 'root'})
export class GifsService {
    
    private http = inject(HttpClient)

    trendingGifs = signal<Gif[]>([])
    trendingGifsLoad = signal<boolean>(true)
 
    searchHistory = signal<Record<string,Gif[]>>(loadFromLocalStorage())
    //Para extraer las keys cada vez que el record cambia
    searchHistoryKey = computed(() => Object.keys(this.searchHistory()))

    constructor(){
        // this.loadTrendingGifs()
        console.log('Servicio Creado')
    }

    saveGifsToLocalStorage = effect( () =>{
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()) )
    })

    loadTrendingGifs(){

        this.http.get<GiphyResponse>(
            `${environment.giphyUrl}/gifs/trending`,
            {
                params:{
                    api_key : environment.giphyApiKey,
                    limit : '20',
                }
            }
        ).subscribe(    
            (resp) => {
                const gifs = GifMapper.mapGiphyItemsToGifsArray(resp.data)
                this.trendingGifs.set(gifs)
                this.trendingGifsLoad.set(false)
            }
        )
    }
    
    searchGifs(query: string) : Observable<Gif[]> {
        return this.http.get<GiphyResponse>(
            `${environment.giphyUrl}/gifs/search`, {
                params : {
                    api_key : environment.giphyApiKey,
                    q : query,
                    limit : '20',
                }
            }
        ).pipe(
            map(({data}) => data),
            map( (items) => GifMapper.mapGiphyItemsToGifsArray(items) ),
            tap(
                items => {
                    this.searchHistory.update( (current) => {
                        return {
                            ...current,
                            [query.toLocaleLowerCase()] : items
                        }
                    })
                   // localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()) )
                }
            )
        )


    }

    getHistoryGifs(query: string){
        return this.searchHistory()[query] ?? []
    }

}