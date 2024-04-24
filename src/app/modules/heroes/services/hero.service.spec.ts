import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero, HeroUpsert } from '../../../shared/models/hero.model';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should filter heroes by term from API', () => {
    const term = 'super';
    const filteredHeroes: Hero[] = [
      { id: '1', name: 'Superman' },
      { id: '2', name: 'Supergirl' },
    ];

    service.filterHeroesByTerm(term).subscribe((heroes) => {
      expect(heroes).toEqual(filteredHeroes);
    });

    const req = httpMock.expectOne(`${service.baseUrl}?name_like=${term}`);
    expect(req.request.method).toBe('GET');
    req.flush(filteredHeroes);
  });

  it('should fetch heroes from API', () => {
    const mockHeroes: Hero[] = [
      { id: '1', name: 'Hero 1' },
      { id: '2', name: 'Hero 2' },
    ];

    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should add a hero via API', () => {
    const mockHero: HeroUpsert = { id: '1', name: 'New Hero' };

    service.addHero(mockHero).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockHero);
  });

  it('should get hero by id from API', () => {
    const heroId = '1';
    const mockHero: Hero = { id: heroId, name: 'Hero 1' };

    service.getHeroById(heroId).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${heroId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should update a hero via API', () => {
    const mockHero: HeroUpsert = { id: '1', name: 'Updated Hero' };

    service.updateHero(mockHero).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${mockHero.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockHero);
  });

  it('should delete a hero via API', () => {
    const heroId = '1';

    service.deleteHero(heroId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${heroId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
