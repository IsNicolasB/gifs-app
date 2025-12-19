import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListItem {
  gif = input<string>();
}
