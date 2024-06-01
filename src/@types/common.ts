import { StrictEffect } from 'redux-saga/effects'

export type SagaGenerator<ResponseData> = Generator<StrictEffect, void, ResponseData>
