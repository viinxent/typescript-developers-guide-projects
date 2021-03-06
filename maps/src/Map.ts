// INTERFACES

// Instructions to every other class
// on how they can be argument to 'addMarker'
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

// MAP CLASS

export class Map {
  private googleMap: google.maps.Map;

  constructor(elementId: string) {
    const element = document.getElementById(elementId);

    this.googleMap = new google.maps.Map(element, {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });

    marker.addListener('click', () => {
      const content = mappable.markerContent();
      const infoWindow = new google.maps.InfoWindow({ content });
      infoWindow.open(this.googleMap, marker);
    });
  }
}
