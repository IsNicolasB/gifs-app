import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifList],
  templateUrl: './trending-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPage { 
  gifService = inject(GifsService)
  // gifs= computed(() => this.gifService.trendingGifs())
}
