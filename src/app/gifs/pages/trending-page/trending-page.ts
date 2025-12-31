import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifList],
  templateUrl: './trending-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPage implements AfterViewInit{

  
  gifService = inject(GifsService)
  scrollStateService = inject(ScrollStateService)
  // gifs= computed(() => this.gifService.trendingGifs())
  
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')
 
  constructor(){
    if(this.gifService.trendingPage() === 0){
      this.gifService.loadTrendingGifs()
    }
  }
  
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if(!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState()
  } 

  onScroll(event : Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if(!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const scrollClienteHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    
    const isAtBottom = scrollTop + scrollClienteHeight >= scrollHeight - 250;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    console.log({scrollTop, scrollClienteHeight, scrollHeight})
    if(isAtBottom) {
      this.gifService.loadTrendingGifs()
    }
  } 

}
