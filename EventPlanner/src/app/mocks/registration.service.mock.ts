import { of } from 'rxjs';
import { Category } from '../models/category.model';
import { EventType } from '../models/event-type.model';

export const mockCategories: Category[] = [
    {
        id: 1,
        name: 'Music',
        description: 'All music-related services and items.',
        isDeleted: false,
        status: 'ACCEPTED',
    },
    {
        id: 2,
        name: 'Decoration',
        description: 'Event decoration and styling.',
        isDeleted: false,
        status: 'ACCEPTED',
    },
];

export const mockEventTypes: EventType[] = [
    {
        id: 1,
        name: 'Wedding',
        description: 'A formal ceremony and celebration for marriage.',
        categories: ['Decoration', 'Catering'],
    },
    {
        id: 2,
        name: 'Festival',
        description:
            'A public celebration or event usually with music and food.',
        categories: ['Music', 'Food', 'Lighting'],
    },
];

export function createUserServiceMock() {
    const userServiceMock = jasmine.createSpyObj('UserService', [
        'eventOrganizerRegistration',
        'serviceProductProviderRegistration',
    ]);
    userServiceMock.eventOrganizerRegistration.and.returnValue(of({}));
    userServiceMock.serviceProductProviderRegistration.and.returnValue(of({}));
    return userServiceMock;
}

export function createCategoryServiceMock() {
    const categoryServiceMock = jasmine.createSpyObj('CategoryService', [
        'getCategories',
    ]);
    categoryServiceMock.getCategories.and.returnValue(of(mockCategories));
    return categoryServiceMock;
}

export function createEventTypeServiceMock() {
    const eventTypeServiceMock = jasmine.createSpyObj('EventTypeService', [
        'getAll',
    ]);
    eventTypeServiceMock.getAll.and.returnValue(of(mockEventTypes));
    return eventTypeServiceMock;
}

export function createSnackBarMock() {
    return jasmine.createSpyObj('MatSnackBar', ['open']);
}

export function createRouterMock() {
    return jasmine.createSpyObj('Router', ['navigate']);
}
