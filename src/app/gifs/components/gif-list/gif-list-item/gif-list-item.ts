import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListItem {
  gif = input<Gif>();
}
