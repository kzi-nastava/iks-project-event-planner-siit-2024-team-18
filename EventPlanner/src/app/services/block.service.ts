import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Block } from '../models/block.model';

@Injectable({
    providedIn: 'root',
})
export class BlockService {
    constructor(private http: HttpClient) {}

    getBlock(blockedId: number): Observable<Block> {
        return this.http.get<Block>(
            `${environment.apiHost}/api/blocks/` + blockedId
        );
    }

    blockOtherUser(block: Block): Observable<Block> {
        return this.http.post<Block>(
            `${environment.apiHost}/api/blocks/block-user`,
            block
        );
    }

    unblockOtherUser(block: Block): Observable<Block> {
        return this.http.put<Block>(
            `${environment.apiHost}/api/blocks/unblock-user`,
            block
        );
    }
}
