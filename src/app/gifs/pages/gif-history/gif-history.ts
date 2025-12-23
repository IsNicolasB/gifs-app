import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import { GifsService } from '../../services/gifs.service';
import { GifList } from "../../components/gif-list/gif-list";

@Component({
  selector: 'app-gif-history',
  imports: [GifList],
  templateUrl: './gif-history.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistory { 

  gifService = inject(GifsService)

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( params => params['query'])
    )
  )

  gifsByKey= computed(() => this.gifService.getHistoryGifs(this.query() ) )
}
