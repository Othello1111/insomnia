// @flow
import * as db from '../common/database';
import type { BaseModel } from './index';

export const name = 'Client Certificate';
export const type = 'ClientCertificate';
export const prefix = 'crt';
export const canDuplicate = true;
export const canSync = false;

type BaseClientCertificate = {
  parentId: string,
  host: string,
  passphrase: string | null,
  cert: string | null,
  key: string | null,
  pfx: string | null,
  disabled: boolean,

  // For sync control
  isPrivate: boolean,
};

export type ClientCertificate = BaseModel & BaseClientCertificate;

export function init(): BaseClientCertificate {
  return {
    parentId: '',
    host: '',
    passphrase: null,
    disabled: false,
    cert: null,
    key: null,
    pfx: null,
    isPrivate: false,
  };
}

export async function migrate(doc: ClientCertificate) {
  return doc;
}

export function create(patch: $Shape<ClientCertificate> = {}): Promise<ClientCertificate> {
  if (!patch.parentId) {
    throw new Error('New ClientCertificate missing `parentId`: ' + JSON.stringify(patch));
  }

  return db.docCreate(type, patch);
}

export function update(
  cert: ClientCertificate,
  patch: $Shape<ClientCertificate> = {},
): Promise<ClientCertificate> {
  return db.docUpdate(cert, patch);
}

export function getById(id: string): Promise<ClientCertificate | null> {
  return db.get(type, id);
}

export function findByParentId(parentId: string): Promise<Array<ClientCertificate>> {
  return db.find(type, { parentId });
}

export function remove(cert: ClientCertificate): Promise<void> {
  return db.remove(cert);
}

export function all(): Promise<Array<ClientCertificate>> {
  return db.all(type);
}
