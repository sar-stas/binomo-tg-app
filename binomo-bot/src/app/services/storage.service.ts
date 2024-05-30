import { Injectable } from '@angular/core';
import {AUTH_TOKEN_NAME, IS_ONBOARDING_PASSED, REFRESH_TOKEN_NAME} from "../data/constants";


const PREFIX = 'top_';

export type LocalStorageTypeMap = {
  [AUTH_TOKEN_NAME]: string;
  [REFRESH_TOKEN_NAME]: string;
  [IS_ONBOARDING_PASSED]: string;
};
export type Maybe<T> = T | null;

@Injectable()
export class LocalStorageService {
  public get<K extends keyof LocalStorageTypeMap>(
    key: K
  ): Maybe<LocalStorageTypeMap[K]> {
    const keyName = this.keyName(key);
    const item =
      localStorage.getItem(keyName) || sessionStorage.getItem(keyName);

    let result: Maybe<LocalStorageTypeMap[K]> = null;

    try {
      result = JSON.parse(item || 'null');
    } catch (e) {
      console.error(
        `Could not parse the localStorage value for "${key}" (${item})`
      );
    }

    return result;
  }

  public remove(key: keyof LocalStorageTypeMap): void {
    const keyName = this.keyName(key);

    localStorage.removeItem(keyName);
    sessionStorage.removeItem(keyName);
  }

  public set<K extends keyof LocalStorageTypeMap>(
    key: K,
    value: LocalStorageTypeMap[K],
    session = false
  ): void {
    const storage = session ? sessionStorage : localStorage;
    const keyName = this.keyName(key);

    storage.setItem(keyName, JSON.stringify(value));
  }

  private keyName(key: string): string {
    return `${PREFIX}${key}`;
  }
}
