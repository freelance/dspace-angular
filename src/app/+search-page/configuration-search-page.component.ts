import { HostWindowService } from '../shared/host-window.service';
import { SearchPageComponent } from './search-page.component';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { pushInOut } from '../shared/animations/push';
import { RouteService } from '../shared/services/route.service';
import { SEARCH_CONFIG_SERVICE } from '../+my-dspace-page/my-dspace-page.component';
import { SearchConfigurationService } from '../core/shared/search/search-configuration.service';
import { SearchService } from '../core/shared/search/search.service';
import { SearchSidebarService } from '../core/shared/search/search-sidebar.service';
import { Router } from '@angular/router';
import { hasValue } from '../shared/empty.util';

/**
 * This component renders a search page using a configuration as input.
 */
@Component({
  selector: 'ds-configuration-search-page',
  styleUrls: ['./search-page.component.scss'],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [pushInOut],
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService
    }
  ]
})

export class ConfigurationSearchPageComponent extends SearchPageComponent implements OnInit {
  /**
   * The configuration to use for the search options
   * If empty, the configuration will be determined by the route parameter called 'configuration'
   */
  @Input() configuration: string;

  constructor(protected service: SearchService,
              protected sidebarService: SearchSidebarService,
              protected windowService: HostWindowService,
              @Inject(SEARCH_CONFIG_SERVICE) public searchConfigService: SearchConfigurationService,
              protected routeService: RouteService,
              protected router: Router) {
    super(service, sidebarService, windowService, searchConfigService, routeService, router);
  }

  /**
   * Listening to changes in the paginated search options
   * If something changes, update the search results
   *
   * Listen to changes in the scope
   * If something changes, update the list of scopes for the dropdown
   */
  ngOnInit(): void {
    super.ngOnInit();
    if (hasValue(this.configuration )) {
      this.routeService.setParameter('configuration', this.configuration);
    }
  }
}
