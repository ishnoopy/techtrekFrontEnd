import { Component, Input } from '@angular/core';
import { environment } from 'src/app/config/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  serverPath:string = environment.apiUrl;
  @Input() product!:any;
}
