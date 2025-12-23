import { ChangeDetectionStrategy, Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLinkActive, RouterLink } from "@angular/router";
import { GifsService } from 'src/app/gifs/services/gifs.service';

interface MenuOption {
  icon : string;
  label: string;
  route: string;
  subLabel:string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptions {

  gifService = inject(GifsService)

  menuOptions : WritableSignal<MenuOption[]> = signal([    
    {
      icon : 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel : 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon : 'fa-solid fa-magnifying-glass',
      label: 'Search',
      subLabel : 'Buscar Gifs',
      route: '/dashboard/search'
    }
  ])
}
