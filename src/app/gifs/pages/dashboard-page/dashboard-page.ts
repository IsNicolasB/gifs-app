import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from "../../components/side-menu/side-menu";

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SideMenu],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPage { }
 