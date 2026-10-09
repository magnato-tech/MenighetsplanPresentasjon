import { CUSTOMERS_COLLECTION } from './config.js';
import { getCrmDb } from './firestore.js';
import type { ChurchRegistration, RegistrationStatus } from './types.js';

export async function listCustomers(): Promise<ChurchRegistration[]> {
  const db = getCrmDb();
  const snapshot = await db.collection(CUSTOMERS_COLLECTION).get();
  const list: ChurchRegistration[] = [];
  snapshot.forEach((docSnap) => {
    list.push(docSnap.data() as ChurchRegistration);
  });
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return list;
}

export async function createCustomer(record: ChurchRegistration): Promise<void> {
  const db = getCrmDb();
  await db.collection(CUSTOMERS_COLLECTION).doc(record.id).set(record);
}

export async function updateCustomer(
  id: string,
  patch: {
    status?: RegistrationStatus;
    adminNotes?: string;
    confirmationEmailAt?: string;
    confirmationEmailOk?: boolean;
    confirmationEmailFailedAt?: string | null;
  }
): Promise<ChurchRegistration | null> {
  const db = getCrmDb();
  const ref = db.collection(CUSTOMERS_COLLECTION).doc(id);
  const existing = await ref.get();
  if (!existing.exists) return null;

  const updateData: Record<string, string | boolean | null> = {
    updatedAt: new Date().toISOString(),
  };
  if (patch.status !== undefined) updateData.status = patch.status;
  if (patch.adminNotes !== undefined) updateData.adminNotes = patch.adminNotes;
  if (patch.confirmationEmailAt !== undefined) updateData.confirmationEmailAt = patch.confirmationEmailAt;
  if (patch.confirmationEmailOk !== undefined) updateData.confirmationEmailOk = patch.confirmationEmailOk;
  if (patch.confirmationEmailFailedAt !== undefined) {
    updateData.confirmationEmailFailedAt = patch.confirmationEmailFailedAt;
  }

  await ref.update(updateData);
  const updated = await ref.get();
  return updated.data() as ChurchRegistration;
}
