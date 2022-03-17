import { Writer, Reader, Protobuf } from "as-proto";

export namespace tendermint {
  export class EventData {
    static encode(message: EventData, writer: Writer): void {
      const event = message.event;
      if (event !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.Event.encode(event, writer);
        writer.ldelim();
      }

      const block = message.block;
      if (block !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.EventBlock.encode(block, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): EventData {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new EventData();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.event = tendermint.Event.decode(reader, reader.uint32());
            break;

          case 2:
            message.block = tendermint.EventBlock.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    event: tendermint.Event | null;
    block: tendermint.EventBlock | null;

    constructor(
      event: tendermint.Event | null = null,
      block: tendermint.EventBlock | null = null
    ) {
      this.event = event;
      this.block = block;
    }
  }

  export class EventList {
    static encode(message: EventList, writer: Writer): void {
      const new_block = message.new_block;
      if (new_block !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.EventBlock.encode(new_block, writer);
        writer.ldelim();
      }

      const transaction = message.transaction;
      for (let i = 0; i < transaction.length; ++i) {
        writer.uint32(18);
        writer.fork();
        tendermint.EventTx.encode(transaction[i], writer);
        writer.ldelim();
      }

      const validator_set_updates = message.validator_set_updates;
      if (validator_set_updates !== null) {
        writer.uint32(26);
        writer.fork();
        tendermint.EventValidatorSetUpdates.encode(
          validator_set_updates,
          writer
        );
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): EventList {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new EventList();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.new_block = tendermint.EventBlock.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.transaction.push(
              tendermint.EventTx.decode(reader, reader.uint32())
            );
            break;

          case 3:
            message.validator_set_updates =
              tendermint.EventValidatorSetUpdates.decode(
                reader,
                reader.uint32()
              );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    new_block: tendermint.EventBlock | null;
    transaction: Array<tendermint.EventTx>;
    validator_set_updates: tendermint.EventValidatorSetUpdates | null;

    constructor(
      new_block: tendermint.EventBlock | null = null,
      transaction: Array<tendermint.EventTx> = [],
      validator_set_updates: tendermint.EventValidatorSetUpdates | null = null
    ) {
      this.new_block = new_block;
      this.transaction = transaction;
      this.validator_set_updates = validator_set_updates;
    }
  }

  export class Reward {
    static encode(message: Reward, writer: Writer): void {
      const amount = message.amount;
      if (amount !== null) {
        writer.uint32(10);
        writer.string(amount);
      }

      const validator = message.validator;
      if (validator !== null) {
        writer.uint32(18);
        writer.string(validator);
      }
    }

    static decode(reader: Reader, length: i32): Reward {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Reward();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.amount = reader.string();
            break;

          case 2:
            message.validator = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    amount: string | null;
    validator: string | null;

    constructor(amount: string | null = null, validator: string | null = null) {
      this.amount = amount;
      this.validator = validator;
    }
  }

  export class Block {
    static encode(message: Block, writer: Writer): void {
      const header = message.header;
      if (header !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.Header.encode(header, writer);
        writer.ldelim();
      }

      const data = message.data;
      if (data !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.Data.encode(data, writer);
        writer.ldelim();
      }

      const evidence = message.evidence;
      if (evidence !== null) {
        writer.uint32(26);
        writer.fork();
        tendermint.EvidenceList.encode(evidence, writer);
        writer.ldelim();
      }

      const last_commit = message.last_commit;
      if (last_commit !== null) {
        writer.uint32(34);
        writer.fork();
        tendermint.Commit.encode(last_commit, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): Block {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Block();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.header = tendermint.Header.decode(reader, reader.uint32());
            break;

          case 2:
            message.data = tendermint.Data.decode(reader, reader.uint32());
            break;

          case 3:
            message.evidence = tendermint.EvidenceList.decode(
              reader,
              reader.uint32()
            );
            break;

          case 4:
            message.last_commit = tendermint.Commit.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    header: tendermint.Header | null;
    data: tendermint.Data | null;
    evidence: tendermint.EvidenceList | null;
    last_commit: tendermint.Commit | null;

    constructor(
      header: tendermint.Header | null = null,
      data: tendermint.Data | null = null,
      evidence: tendermint.EvidenceList | null = null,
      last_commit: tendermint.Commit | null = null
    ) {
      this.header = header;
      this.data = data;
      this.evidence = evidence;
      this.last_commit = last_commit;
    }
  }

  export class BlockID {
    static encode(message: BlockID, writer: Writer): void {
      const hash = message.hash;
      if (hash !== null) {
        writer.uint32(10);
        writer.bytes(hash);
      }

      const part_set_header = message.part_set_header;
      if (part_set_header !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.PartSetHeader.encode(part_set_header, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): BlockID {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new BlockID();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.hash = reader.bytes();
            break;

          case 2:
            message.part_set_header = tendermint.PartSetHeader.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    hash: Uint8Array | null;
    part_set_header: tendermint.PartSetHeader | null;

    constructor(
      hash: Uint8Array | null = null,
      part_set_header: tendermint.PartSetHeader | null = null
    ) {
      this.hash = hash;
      this.part_set_header = part_set_header;
    }
  }

  @unmanaged
  export class BlockParams {
    static encode(message: BlockParams, writer: Writer): void {
      writer.uint32(8);
      writer.int64(message.max_bytes);

      writer.uint32(16);
      writer.int64(message.max_gas);
    }

    static decode(reader: Reader, length: i32): BlockParams {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new BlockParams();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.max_bytes = reader.int64();
            break;

          case 2:
            message.max_gas = reader.int64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    max_bytes: i64;
    max_gas: i64;

    constructor(max_bytes: i64 = 0, max_gas: i64 = 0) {
      this.max_bytes = max_bytes;
      this.max_gas = max_gas;
    }
  }

  export class Commit {
    static encode(message: Commit, writer: Writer): void {
      writer.uint32(8);
      writer.int64(message.height);

      writer.uint32(16);
      writer.int32(message.round);

      const block_id = message.block_id;
      if (block_id !== null) {
        writer.uint32(26);
        writer.fork();
        tendermint.BlockID.encode(block_id, writer);
        writer.ldelim();
      }

      const signatures = message.signatures;
      for (let i = 0; i < signatures.length; ++i) {
        writer.uint32(34);
        writer.fork();
        tendermint.CommitSig.encode(signatures[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): Commit {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Commit();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.height = reader.int64();
            break;

          case 2:
            message.round = reader.int32();
            break;

          case 3:
            message.block_id = tendermint.BlockID.decode(
              reader,
              reader.uint32()
            );
            break;

          case 4:
            message.signatures.push(
              tendermint.CommitSig.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    height: i64;
    round: i32;
    block_id: tendermint.BlockID | null;
    signatures: Array<tendermint.CommitSig>;

    constructor(
      height: i64 = 0,
      round: i32 = 0,
      block_id: tendermint.BlockID | null = null,
      signatures: Array<tendermint.CommitSig> = []
    ) {
      this.height = height;
      this.round = round;
      this.block_id = block_id;
      this.signatures = signatures;
    }
  }

  export class CommitSig {
    static encode(message: CommitSig, writer: Writer): void {
      writer.uint32(8);
      writer.int32(message.block_id_flag);

      const validator_address = message.validator_address;
      if (validator_address !== null) {
        writer.uint32(18);
        writer.bytes(validator_address);
      }

      const timestamp = message.timestamp;
      if (timestamp !== null) {
        writer.uint32(26);
        writer.fork();
        tendermint.Timestamp.encode(timestamp, writer);
        writer.ldelim();
      }

      const signature = message.signature;
      if (signature !== null) {
        writer.uint32(34);
        writer.bytes(signature);
      }
    }

    static decode(reader: Reader, length: i32): CommitSig {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new CommitSig();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.block_id_flag = reader.int32();
            break;

          case 2:
            message.validator_address = reader.bytes();
            break;

          case 3:
            message.timestamp = tendermint.Timestamp.decode(
              reader,
              reader.uint32()
            );
            break;

          case 4:
            message.signature = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    block_id_flag: tendermint.BlockIDFlag;
    validator_address: Uint8Array | null;
    timestamp: tendermint.Timestamp | null;
    signature: Uint8Array | null;

    constructor(
      block_id_flag: tendermint.BlockIDFlag = 0,
      validator_address: Uint8Array | null = null,
      timestamp: tendermint.Timestamp | null = null,
      signature: Uint8Array | null = null
    ) {
      this.block_id_flag = block_id_flag;
      this.validator_address = validator_address;
      this.timestamp = timestamp;
      this.signature = signature;
    }
  }

  @unmanaged
  export class Consensus {
    static encode(message: Consensus, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.block);

      writer.uint32(16);
      writer.uint64(message.app);
    }

    static decode(reader: Reader, length: i32): Consensus {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Consensus();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.block = reader.uint64();
            break;

          case 2:
            message.app = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    block: u64;
    app: u64;

    constructor(block: u64 = 0, app: u64 = 0) {
      this.block = block;
      this.app = app;
    }
  }

  export class ConsensusParams {
    static encode(message: ConsensusParams, writer: Writer): void {
      const block = message.block;
      if (block !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.BlockParams.encode(block, writer);
        writer.ldelim();
      }

      const evidence = message.evidence;
      if (evidence !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.EvidenceParams.encode(evidence, writer);
        writer.ldelim();
      }

      const validator = message.validator;
      if (validator !== null) {
        writer.uint32(26);
        writer.fork();
        tendermint.ValidatorParams.encode(validator, writer);
        writer.ldelim();
      }

      const version = message.version;
      if (version !== null) {
        writer.uint32(34);
        writer.fork();
        tendermint.VersionParams.encode(version, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): ConsensusParams {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new ConsensusParams();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.block = tendermint.BlockParams.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.evidence = tendermint.EvidenceParams.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.validator = tendermint.ValidatorParams.decode(
              reader,
              reader.uint32()
            );
            break;

          case 4:
            message.version = tendermint.VersionParams.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    block: tendermint.BlockParams | null;
    evidence: tendermint.EvidenceParams | null;
    validator: tendermint.ValidatorParams | null;
    version: tendermint.VersionParams | null;

    constructor(
      block: tendermint.BlockParams | null = null,
      evidence: tendermint.EvidenceParams | null = null,
      validator: tendermint.ValidatorParams | null = null,
      version: tendermint.VersionParams | null = null
    ) {
      this.block = block;
      this.evidence = evidence;
      this.validator = validator;
      this.version = version;
    }
  }

  export class Data {
    static encode(message: Data, writer: Writer): void {
      const txs = message.txs;
      if (txs.length !== 0) {
        writer.uint32(10);
        writer.fork();
        for (let i = 0; i < txs.length; ++i) {
          writer.bytes(txs[i]);
        }
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): Data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Data();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if ((tag & 7) === 2 && tag !== 26) {
              const repeatedEnd: usize = reader.ptr + reader.uint32();
              while (reader.ptr < repeatedEnd) {
                message.txs.push(reader.bytes());
              }
            } else {
              message.txs.push(reader.bytes());
            }
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    txs: Array<Uint8Array>;

    constructor(txs: Array<Uint8Array> = []) {
      this.txs = txs;
    }
  }

  @unmanaged
  export class Duration {
    static encode(message: Duration, writer: Writer): void {
      writer.uint32(8);
      writer.int64(message.seconds);

      writer.uint32(16);
      writer.int32(message.nanos);
    }

    static decode(reader: Reader, length: i32): Duration {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Duration();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.seconds = reader.int64();
            break;

          case 2:
            message.nanos = reader.int32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    seconds: i64;
    nanos: i32;

    constructor(seconds: i64 = 0, nanos: i32 = 0) {
      this.seconds = seconds;
      this.nanos = nanos;
    }
  }

  export class DuplicateVoteEvidence {
    static encode(message: DuplicateVoteEvidence, writer: Writer): void {
      const vote_a = message.vote_a;
      if (vote_a !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.EventVote.encode(vote_a, writer);
        writer.ldelim();
      }

      const vote_b = message.vote_b;
      if (vote_b !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.EventVote.encode(vote_b, writer);
        writer.ldelim();
      }

      writer.uint32(24);
      writer.int64(message.total_voting_power);

      writer.uint32(32);
      writer.int64(message.validator_power);

      const timestamp = message.timestamp;
      if (timestamp !== null) {
        writer.uint32(42);
        writer.fork();
        tendermint.Timestamp.encode(timestamp, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): DuplicateVoteEvidence {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new DuplicateVoteEvidence();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.vote_a = tendermint.EventVote.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.vote_b = tendermint.EventVote.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.total_voting_power = reader.int64();
            break;

          case 4:
            message.validator_power = reader.int64();
            break;

          case 5:
            message.timestamp = tendermint.Timestamp.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    vote_a: tendermint.EventVote | null;
    vote_b: tendermint.EventVote | null;
    total_voting_power: i64;
    validator_power: i64;
    timestamp: tendermint.Timestamp | null;

    constructor(
      vote_a: tendermint.EventVote | null = null,
      vote_b: tendermint.EventVote | null = null,
      total_voting_power: i64 = 0,
      validator_power: i64 = 0,
      timestamp: tendermint.Timestamp | null = null
    ) {
      this.vote_a = vote_a;
      this.vote_b = vote_b;
      this.total_voting_power = total_voting_power;
      this.validator_power = validator_power;
      this.timestamp = timestamp;
    }
  }

  export class Event {
    static encode(message: Event, writer: Writer): void {
      const event_type = message.event_type;
      if (event_type !== null) {
        writer.uint32(10);
        writer.string(event_type);
      }

      const attributes = message.attributes;
      for (let i = 0; i < attributes.length; ++i) {
        writer.uint32(18);
        writer.fork();
        tendermint.EventAttribute.encode(attributes[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): Event {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Event();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.event_type = reader.string();
            break;

          case 2:
            message.attributes.push(
              tendermint.EventAttribute.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    event_type: string | null;
    attributes: Array<tendermint.EventAttribute>;

    constructor(
      event_type: string | null = null,
      attributes: Array<tendermint.EventAttribute> = []
    ) {
      this.event_type = event_type;
      this.attributes = attributes;
    }
  }

  export class EventAttribute {
    static encode(message: EventAttribute, writer: Writer): void {
      const key = message.key;
      if (key !== null) {
        writer.uint32(10);
        writer.string(key);
      }

      const value = message.value;
      if (value !== null) {
        writer.uint32(18);
        writer.string(value);
      }

      writer.uint32(24);
      writer.bool(message.index);
    }

    static decode(reader: Reader, length: i32): EventAttribute {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new EventAttribute();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.key = reader.string();
            break;

          case 2:
            message.value = reader.string();
            break;

          case 3:
            message.index = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    key: string | null;
    value: string | null;
    index: bool;

    constructor(
      key: string | null = null,
      value: string | null = null,
      index: bool = false
    ) {
      this.key = key;
      this.value = value;
      this.index = index;
    }
  }

  export class EventBlock {
    static encode(message: EventBlock, writer: Writer): void {
      const block = message.block;
      if (block !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.Block.encode(block, writer);
        writer.ldelim();
      }

      const block_id = message.block_id;
      if (block_id !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.BlockID.encode(block_id, writer);
        writer.ldelim();
      }

      const result_begin_block = message.result_begin_block;
      if (result_begin_block !== null) {
        writer.uint32(26);
        writer.fork();
        tendermint.ResponseBeginBlock.encode(result_begin_block, writer);
        writer.ldelim();
      }

      const result_end_block = message.result_end_block;
      if (result_end_block !== null) {
        writer.uint32(34);
        writer.fork();
        tendermint.ResponseEndBlock.encode(result_end_block, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): EventBlock {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new EventBlock();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.block = tendermint.Block.decode(reader, reader.uint32());
            break;

          case 2:
            message.block_id = tendermint.BlockID.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.result_begin_block = tendermint.ResponseBeginBlock.decode(
              reader,
              reader.uint32()
            );
            break;

          case 4:
            message.result_end_block = tendermint.ResponseEndBlock.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    block: tendermint.Block | null;
    block_id: tendermint.BlockID | null;
    result_begin_block: tendermint.ResponseBeginBlock | null;
    result_end_block: tendermint.ResponseEndBlock | null;

    constructor(
      block: tendermint.Block | null = null,
      block_id: tendermint.BlockID | null = null,
      result_begin_block: tendermint.ResponseBeginBlock | null = null,
      result_end_block: tendermint.ResponseEndBlock | null = null
    ) {
      this.block = block;
      this.block_id = block_id;
      this.result_begin_block = result_begin_block;
      this.result_end_block = result_end_block;
    }
  }

  export class EventTx {
    static encode(message: EventTx, writer: Writer): void {
      const tx_result = message.tx_result;
      if (tx_result !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.TxResult.encode(tx_result, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): EventTx {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new EventTx();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.tx_result = tendermint.TxResult.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    tx_result: tendermint.TxResult | null;

    constructor(tx_result: tendermint.TxResult | null = null) {
      this.tx_result = tx_result;
    }
  }

  export class EventValidatorSetUpdates {
    static encode(message: EventValidatorSetUpdates, writer: Writer): void {
      const validator_updates = message.validator_updates;
      for (let i = 0; i < validator_updates.length; ++i) {
        writer.uint32(10);
        writer.fork();
        tendermint.Validator.encode(validator_updates[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): EventValidatorSetUpdates {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new EventValidatorSetUpdates();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.validator_updates.push(
              tendermint.Validator.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    validator_updates: Array<tendermint.Validator>;

    constructor(validator_updates: Array<tendermint.Validator> = []) {
      this.validator_updates = validator_updates;
    }
  }

  export class EventVote {
    static encode(message: EventVote, writer: Writer): void {
      writer.uint32(8);
      writer.int32(message.event_vote_type);

      writer.uint32(16);
      writer.uint64(message.height);

      writer.uint32(24);
      writer.int32(message.round);

      const block_id = message.block_id;
      if (block_id !== null) {
        writer.uint32(34);
        writer.fork();
        tendermint.BlockID.encode(block_id, writer);
        writer.ldelim();
      }

      const timestamp = message.timestamp;
      if (timestamp !== null) {
        writer.uint32(42);
        writer.fork();
        tendermint.Timestamp.encode(timestamp, writer);
        writer.ldelim();
      }

      const validator_address = message.validator_address;
      if (validator_address !== null) {
        writer.uint32(50);
        writer.bytes(validator_address);
      }

      writer.uint32(56);
      writer.int32(message.validator_index);

      const signature = message.signature;
      if (signature !== null) {
        writer.uint32(66);
        writer.bytes(signature);
      }
    }

    static decode(reader: Reader, length: i32): EventVote {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new EventVote();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.event_vote_type = reader.int32();
            break;

          case 2:
            message.height = reader.uint64();
            break;

          case 3:
            message.round = reader.int32();
            break;

          case 4:
            message.block_id = tendermint.BlockID.decode(
              reader,
              reader.uint32()
            );
            break;

          case 5:
            message.timestamp = tendermint.Timestamp.decode(
              reader,
              reader.uint32()
            );
            break;

          case 6:
            message.validator_address = reader.bytes();
            break;

          case 7:
            message.validator_index = reader.int32();
            break;

          case 8:
            message.signature = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    event_vote_type: tendermint.SignedMsgType;
    height: u64;
    round: i32;
    block_id: tendermint.BlockID | null;
    timestamp: tendermint.Timestamp | null;
    validator_address: Uint8Array | null;
    validator_index: i32;
    signature: Uint8Array | null;

    constructor(
      event_vote_type: tendermint.SignedMsgType = 0,
      height: u64 = 0,
      round: i32 = 0,
      block_id: tendermint.BlockID | null = null,
      timestamp: tendermint.Timestamp | null = null,
      validator_address: Uint8Array | null = null,
      validator_index: i32 = 0,
      signature: Uint8Array | null = null
    ) {
      this.event_vote_type = event_vote_type;
      this.height = height;
      this.round = round;
      this.block_id = block_id;
      this.timestamp = timestamp;
      this.validator_address = validator_address;
      this.validator_index = validator_index;
      this.signature = signature;
    }
  }

  export class Evidence {
    static encode(message: Evidence, writer: Writer): void {
      const duplicate_vote_evidence = message.duplicate_vote_evidence;
      if (duplicate_vote_evidence !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.DuplicateVoteEvidence.encode(
          duplicate_vote_evidence,
          writer
        );
        writer.ldelim();
      }

      const light_client_attack_evidence = message.light_client_attack_evidence;
      if (light_client_attack_evidence !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.LightClientAttackEvidence.encode(
          light_client_attack_evidence,
          writer
        );
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): Evidence {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Evidence();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.duplicate_vote_evidence =
              tendermint.DuplicateVoteEvidence.decode(reader, reader.uint32());
            break;

          case 2:
            message.light_client_attack_evidence =
              tendermint.LightClientAttackEvidence.decode(
                reader,
                reader.uint32()
              );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    duplicate_vote_evidence: tendermint.DuplicateVoteEvidence | null;
    light_client_attack_evidence: tendermint.LightClientAttackEvidence | null;

    constructor(
      duplicate_vote_evidence: tendermint.DuplicateVoteEvidence | null = null,
      light_client_attack_evidence: tendermint.LightClientAttackEvidence | null = null
    ) {
      this.duplicate_vote_evidence = duplicate_vote_evidence;
      this.light_client_attack_evidence = light_client_attack_evidence;
    }
  }

  export class EvidenceList {
    static encode(message: EvidenceList, writer: Writer): void {
      const evidence = message.evidence;
      for (let i = 0; i < evidence.length; ++i) {
        writer.uint32(10);
        writer.fork();
        tendermint.Evidence.encode(evidence[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): EvidenceList {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new EvidenceList();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.evidence.push(
              tendermint.Evidence.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    evidence: Array<tendermint.Evidence>;

    constructor(evidence: Array<tendermint.Evidence> = []) {
      this.evidence = evidence;
    }
  }

  @unmanaged
  export class EvidenceParams {
    static encode(message: EvidenceParams, writer: Writer): void {
      writer.uint32(8);
      writer.int64(message.max_age_num_blocks);

      const max_age_duration = message.max_age_duration;
      if (max_age_duration !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.Duration.encode(max_age_duration, writer);
        writer.ldelim();
      }

      writer.uint32(24);
      writer.int64(message.max_bytes);
    }

    static decode(reader: Reader, length: i32): EvidenceParams {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new EvidenceParams();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.max_age_num_blocks = reader.int64();
            break;

          case 2:
            message.max_age_duration = tendermint.Duration.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.max_bytes = reader.int64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    max_age_num_blocks: i64;
    max_age_duration: tendermint.Duration | null;
    max_bytes: i64;

    constructor(
      max_age_num_blocks: i64 = 0,
      max_age_duration: tendermint.Duration | null = null,
      max_bytes: i64 = 0
    ) {
      this.max_age_num_blocks = max_age_num_blocks;
      this.max_age_duration = max_age_duration;
      this.max_bytes = max_bytes;
    }
  }

  export class Header {
    static encode(message: Header, writer: Writer): void {
      const version = message.version;
      if (version !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.Consensus.encode(version, writer);
        writer.ldelim();
      }

      const chain_id = message.chain_id;
      if (chain_id !== null) {
        writer.uint32(18);
        writer.string(chain_id);
      }

      writer.uint32(24);
      writer.uint64(message.height);

      const time = message.time;
      if (time !== null) {
        writer.uint32(34);
        writer.fork();
        tendermint.Timestamp.encode(time, writer);
        writer.ldelim();
      }

      const last_block_id = message.last_block_id;
      if (last_block_id !== null) {
        writer.uint32(42);
        writer.fork();
        tendermint.BlockID.encode(last_block_id, writer);
        writer.ldelim();
      }

      const last_commit_hash = message.last_commit_hash;
      if (last_commit_hash !== null) {
        writer.uint32(50);
        writer.bytes(last_commit_hash);
      }

      const data_hash = message.data_hash;
      if (data_hash !== null) {
        writer.uint32(58);
        writer.bytes(data_hash);
      }

      const validators_hash = message.validators_hash;
      if (validators_hash !== null) {
        writer.uint32(66);
        writer.bytes(validators_hash);
      }

      const next_validators_hash = message.next_validators_hash;
      if (next_validators_hash !== null) {
        writer.uint32(74);
        writer.bytes(next_validators_hash);
      }

      const consensus_hash = message.consensus_hash;
      if (consensus_hash !== null) {
        writer.uint32(82);
        writer.bytes(consensus_hash);
      }

      const app_hash = message.app_hash;
      if (app_hash !== null) {
        writer.uint32(90);
        writer.bytes(app_hash);
      }

      const last_results_hash = message.last_results_hash;
      if (last_results_hash !== null) {
        writer.uint32(98);
        writer.bytes(last_results_hash);
      }

      const evidence_hash = message.evidence_hash;
      if (evidence_hash !== null) {
        writer.uint32(106);
        writer.bytes(evidence_hash);
      }

      const proposer_address = message.proposer_address;
      if (proposer_address !== null) {
        writer.uint32(114);
        writer.bytes(proposer_address);
      }
    }

    static decode(reader: Reader, length: i32): Header {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Header();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.version = tendermint.Consensus.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.chain_id = reader.string();
            break;

          case 3:
            message.height = reader.uint64();
            break;

          case 4:
            message.time = tendermint.Timestamp.decode(reader, reader.uint32());
            break;

          case 5:
            message.last_block_id = tendermint.BlockID.decode(
              reader,
              reader.uint32()
            );
            break;

          case 6:
            message.last_commit_hash = reader.bytes();
            break;

          case 7:
            message.data_hash = reader.bytes();
            break;

          case 8:
            message.validators_hash = reader.bytes();
            break;

          case 9:
            message.next_validators_hash = reader.bytes();
            break;

          case 10:
            message.consensus_hash = reader.bytes();
            break;

          case 11:
            message.app_hash = reader.bytes();
            break;

          case 12:
            message.last_results_hash = reader.bytes();
            break;

          case 13:
            message.evidence_hash = reader.bytes();
            break;

          case 14:
            message.proposer_address = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    version: tendermint.Consensus | null;
    chain_id: string | null;
    height: u64;
    time: tendermint.Timestamp | null;
    last_block_id: tendermint.BlockID | null;
    last_commit_hash: Uint8Array | null;
    data_hash: Uint8Array | null;
    validators_hash: Uint8Array | null;
    next_validators_hash: Uint8Array | null;
    consensus_hash: Uint8Array | null;
    app_hash: Uint8Array | null;
    last_results_hash: Uint8Array | null;
    evidence_hash: Uint8Array | null;
    proposer_address: Uint8Array | null;

    constructor(
      version: tendermint.Consensus | null = null,
      chain_id: string | null = null,
      height: u64 = 0,
      time: tendermint.Timestamp | null = null,
      last_block_id: tendermint.BlockID | null = null,
      last_commit_hash: Uint8Array | null = null,
      data_hash: Uint8Array | null = null,
      validators_hash: Uint8Array | null = null,
      next_validators_hash: Uint8Array | null = null,
      consensus_hash: Uint8Array | null = null,
      app_hash: Uint8Array | null = null,
      last_results_hash: Uint8Array | null = null,
      evidence_hash: Uint8Array | null = null,
      proposer_address: Uint8Array | null = null
    ) {
      this.version = version;
      this.chain_id = chain_id;
      this.height = height;
      this.time = time;
      this.last_block_id = last_block_id;
      this.last_commit_hash = last_commit_hash;
      this.data_hash = data_hash;
      this.validators_hash = validators_hash;
      this.next_validators_hash = next_validators_hash;
      this.consensus_hash = consensus_hash;
      this.app_hash = app_hash;
      this.last_results_hash = last_results_hash;
      this.evidence_hash = evidence_hash;
      this.proposer_address = proposer_address;
    }
  }

  export class LightBlock {
    static encode(message: LightBlock, writer: Writer): void {
      const signed_header = message.signed_header;
      if (signed_header !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.SignedHeader.encode(signed_header, writer);
        writer.ldelim();
      }

      const validator_set = message.validator_set;
      if (validator_set !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.ValidatorSet.encode(validator_set, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): LightBlock {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new LightBlock();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.signed_header = tendermint.SignedHeader.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.validator_set = tendermint.ValidatorSet.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    signed_header: tendermint.SignedHeader | null;
    validator_set: tendermint.ValidatorSet | null;

    constructor(
      signed_header: tendermint.SignedHeader | null = null,
      validator_set: tendermint.ValidatorSet | null = null
    ) {
      this.signed_header = signed_header;
      this.validator_set = validator_set;
    }
  }

  export class LightClientAttackEvidence {
    static encode(message: LightClientAttackEvidence, writer: Writer): void {
      const conflicting_block = message.conflicting_block;
      if (conflicting_block !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.LightBlock.encode(conflicting_block, writer);
        writer.ldelim();
      }

      writer.uint32(16);
      writer.int64(message.common_height);

      const byzantine_validators = message.byzantine_validators;
      for (let i = 0; i < byzantine_validators.length; ++i) {
        writer.uint32(26);
        writer.fork();
        tendermint.Validator.encode(byzantine_validators[i], writer);
        writer.ldelim();
      }

      writer.uint32(32);
      writer.int64(message.total_voting_power);

      const timestamp = message.timestamp;
      if (timestamp !== null) {
        writer.uint32(42);
        writer.fork();
        tendermint.Timestamp.encode(timestamp, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): LightClientAttackEvidence {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new LightClientAttackEvidence();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.conflicting_block = tendermint.LightBlock.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.common_height = reader.int64();
            break;

          case 3:
            message.byzantine_validators.push(
              tendermint.Validator.decode(reader, reader.uint32())
            );
            break;

          case 4:
            message.total_voting_power = reader.int64();
            break;

          case 5:
            message.timestamp = tendermint.Timestamp.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    conflicting_block: tendermint.LightBlock | null;
    common_height: i64;
    byzantine_validators: Array<tendermint.Validator>;
    total_voting_power: i64;
    timestamp: tendermint.Timestamp | null;

    constructor(
      conflicting_block: tendermint.LightBlock | null = null,
      common_height: i64 = 0,
      byzantine_validators: Array<tendermint.Validator> = [],
      total_voting_power: i64 = 0,
      timestamp: tendermint.Timestamp | null = null
    ) {
      this.conflicting_block = conflicting_block;
      this.common_height = common_height;
      this.byzantine_validators = byzantine_validators;
      this.total_voting_power = total_voting_power;
      this.timestamp = timestamp;
    }
  }

  export class PublicKey {
    static encode(message: PublicKey, writer: Writer): void {
      const ed25519 = message.ed25519;
      if (ed25519 !== null) {
        writer.uint32(10);
        writer.bytes(ed25519);
      }

      const secp256k1 = message.secp256k1;
      if (secp256k1 !== null) {
        writer.uint32(18);
        writer.bytes(secp256k1);
      }
    }

    static decode(reader: Reader, length: i32): PublicKey {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new PublicKey();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.ed25519 = reader.bytes();
            break;

          case 2:
            message.secp256k1 = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    ed25519: Uint8Array | null;
    secp256k1: Uint8Array | null;

    constructor(
      ed25519: Uint8Array | null = null,
      secp256k1: Uint8Array | null = null
    ) {
      this.ed25519 = ed25519;
      this.secp256k1 = secp256k1;
    }
  }

  export class PartSetHeader {
    static encode(message: PartSetHeader, writer: Writer): void {
      writer.uint32(8);
      writer.uint32(message.total);

      const hash = message.hash;
      if (hash !== null) {
        writer.uint32(18);
        writer.bytes(hash);
      }
    }

    static decode(reader: Reader, length: i32): PartSetHeader {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new PartSetHeader();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.total = reader.uint32();
            break;

          case 2:
            message.hash = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    total: u32;
    hash: Uint8Array | null;

    constructor(total: u32 = 0, hash: Uint8Array | null = null) {
      this.total = total;
      this.hash = hash;
    }
  }

  export class ResponseBeginBlock {
    static encode(message: ResponseBeginBlock, writer: Writer): void {
      const events = message.events;
      for (let i = 0; i < events.length; ++i) {
        writer.uint32(10);
        writer.fork();
        tendermint.Event.encode(events[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): ResponseBeginBlock {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new ResponseBeginBlock();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.events.push(
              tendermint.Event.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    events: Array<tendermint.Event>;

    constructor(events: Array<tendermint.Event> = []) {
      this.events = events;
    }
  }

  export class ResponseEndBlock {
    static encode(message: ResponseEndBlock, writer: Writer): void {
      const validator_updates = message.validator_updates;
      for (let i = 0; i < validator_updates.length; ++i) {
        writer.uint32(10);
        writer.fork();
        tendermint.ValidatorUpdate.encode(validator_updates[i], writer);
        writer.ldelim();
      }

      const consensus_param_updates = message.consensus_param_updates;
      if (consensus_param_updates !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.ConsensusParams.encode(consensus_param_updates, writer);
        writer.ldelim();
      }

      const events = message.events;
      for (let i = 0; i < events.length; ++i) {
        writer.uint32(26);
        writer.fork();
        tendermint.Event.encode(events[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): ResponseEndBlock {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new ResponseEndBlock();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.validator_updates.push(
              tendermint.ValidatorUpdate.decode(reader, reader.uint32())
            );
            break;

          case 2:
            message.consensus_param_updates = tendermint.ConsensusParams.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.events.push(
              tendermint.Event.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    validator_updates: Array<tendermint.ValidatorUpdate>;
    consensus_param_updates: tendermint.ConsensusParams | null;
    events: Array<tendermint.Event>;

    constructor(
      validator_updates: Array<tendermint.ValidatorUpdate> = [],
      consensus_param_updates: tendermint.ConsensusParams | null = null,
      events: Array<tendermint.Event> = []
    ) {
      this.validator_updates = validator_updates;
      this.consensus_param_updates = consensus_param_updates;
      this.events = events;
    }
  }

  export class ResponseDeliverTx {
    static encode(message: ResponseDeliverTx, writer: Writer): void {
      writer.uint32(8);
      writer.uint32(message.code);

      const data = message.data;
      if (data !== null) {
        writer.uint32(18);
        writer.bytes(data);
      }

      const log = message.log;
      if (log !== null) {
        writer.uint32(26);
        writer.string(log);
      }

      const info = message.info;
      if (info !== null) {
        writer.uint32(34);
        writer.string(info);
      }

      writer.uint32(40);
      writer.int64(message.gas_wanted);

      writer.uint32(48);
      writer.int64(message.gas_used);

      const events = message.events;
      for (let i = 0; i < events.length; ++i) {
        writer.uint32(58);
        writer.fork();
        tendermint.Event.encode(events[i], writer);
        writer.ldelim();
      }

      const codespace = message.codespace;
      if (codespace !== null) {
        writer.uint32(66);
        writer.string(codespace);
      }
    }

    static decode(reader: Reader, length: i32): ResponseDeliverTx {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new ResponseDeliverTx();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.code = reader.uint32();
            break;

          case 2:
            message.data = reader.bytes();
            break;

          case 3:
            message.log = reader.string();
            break;

          case 4:
            message.info = reader.string();
            break;

          case 5:
            message.gas_wanted = reader.int64();
            break;

          case 6:
            message.gas_used = reader.int64();
            break;

          case 7:
            message.events.push(
              tendermint.Event.decode(reader, reader.uint32())
            );
            break;

          case 8:
            message.codespace = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    code: u32;
    data: Uint8Array | null;
    log: string | null;
    info: string | null;
    gas_wanted: i64;
    gas_used: i64;
    events: Array<tendermint.Event>;
    codespace: string | null;

    constructor(
      code: u32 = 0,
      data: Uint8Array | null = null,
      log: string | null = null,
      info: string | null = null,
      gas_wanted: i64 = 0,
      gas_used: i64 = 0,
      events: Array<tendermint.Event> = [],
      codespace: string | null = null
    ) {
      this.code = code;
      this.data = data;
      this.log = log;
      this.info = info;
      this.gas_wanted = gas_wanted;
      this.gas_used = gas_used;
      this.events = events;
      this.codespace = codespace;
    }
  }

  export class SignedHeader {
    static encode(message: SignedHeader, writer: Writer): void {
      const header = message.header;
      if (header !== null) {
        writer.uint32(10);
        writer.fork();
        tendermint.Header.encode(header, writer);
        writer.ldelim();
      }

      const commit = message.commit;
      if (commit !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.Commit.encode(commit, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): SignedHeader {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new SignedHeader();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.header = tendermint.Header.decode(reader, reader.uint32());
            break;

          case 2:
            message.commit = tendermint.Commit.decode(reader, reader.uint32());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    header: tendermint.Header | null;
    commit: tendermint.Commit | null;

    constructor(
      header: tendermint.Header | null = null,
      commit: tendermint.Commit | null = null
    ) {
      this.header = header;
      this.commit = commit;
    }
  }

  @unmanaged
  export class Timestamp {
    static encode(message: Timestamp, writer: Writer): void {
      writer.uint32(8);
      writer.int64(message.seconds);

      writer.uint32(16);
      writer.int32(message.nanos);
    }

    static decode(reader: Reader, length: i32): Timestamp {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Timestamp();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.seconds = reader.int64();
            break;

          case 2:
            message.nanos = reader.int32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    seconds: i64;
    nanos: i32;

    constructor(seconds: i64 = 0, nanos: i32 = 0) {
      this.seconds = seconds;
      this.nanos = nanos;
    }
  }

  export class TxResult {
    static encode(message: TxResult, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.height);

      writer.uint32(16);
      writer.uint32(message.index);

      const tx = message.tx;
      if (tx !== null) {
        writer.uint32(26);
        writer.bytes(tx);
      }

      const result = message.result;
      if (result !== null) {
        writer.uint32(34);
        writer.fork();
        tendermint.ResponseDeliverTx.encode(result, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): TxResult {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new TxResult();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.height = reader.uint64();
            break;

          case 2:
            message.index = reader.uint32();
            break;

          case 3:
            message.tx = reader.bytes();
            break;

          case 4:
            message.result = tendermint.ResponseDeliverTx.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    height: u64;
    index: u32;
    tx: Uint8Array | null;
    result: tendermint.ResponseDeliverTx | null;

    constructor(
      height: u64 = 0,
      index: u32 = 0,
      tx: Uint8Array | null = null,
      result: tendermint.ResponseDeliverTx | null = null
    ) {
      this.height = height;
      this.index = index;
      this.tx = tx;
      this.result = result;
    }
  }

  export class Validator {
    static encode(message: Validator, writer: Writer): void {
      const address = message.address;
      if (address !== null) {
        writer.uint32(10);
        writer.bytes(address);
      }

      const pub_key = message.pub_key;
      if (pub_key !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.PublicKey.encode(pub_key, writer);
        writer.ldelim();
      }

      writer.uint32(24);
      writer.int64(message.voting_power);

      writer.uint32(32);
      writer.int64(message.proposer_priority);
    }

    static decode(reader: Reader, length: i32): Validator {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Validator();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.address = reader.bytes();
            break;

          case 2:
            message.pub_key = tendermint.PublicKey.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.voting_power = reader.int64();
            break;

          case 4:
            message.proposer_priority = reader.int64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    address: Uint8Array | null;
    pub_key: tendermint.PublicKey | null;
    voting_power: i64;
    proposer_priority: i64;

    constructor(
      address: Uint8Array | null = null,
      pub_key: tendermint.PublicKey | null = null,
      voting_power: i64 = 0,
      proposer_priority: i64 = 0
    ) {
      this.address = address;
      this.pub_key = pub_key;
      this.voting_power = voting_power;
      this.proposer_priority = proposer_priority;
    }
  }

  export class ValidatorParams {
    static encode(message: ValidatorParams, writer: Writer): void {
      const pub_key_types = message.pub_key_types;
      if (pub_key_types.length !== 0) {
        writer.uint32(10);
        writer.fork();
        for (let i = 0; i < pub_key_types.length; ++i) {
          writer.string(pub_key_types[i]);
        }
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): ValidatorParams {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new ValidatorParams();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if ((tag & 7) === 2 && tag !== 26) {
              const repeatedEnd: usize = reader.ptr + reader.uint32();
              while (reader.ptr < repeatedEnd) {
                message.pub_key_types.push(reader.string());
              }
            } else {
              message.pub_key_types.push(reader.string());
            }
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    pub_key_types: Array<string>;

    constructor(pub_key_types: Array<string> = []) {
      this.pub_key_types = pub_key_types;
    }
  }

  export class ValidatorSet {
    static encode(message: ValidatorSet, writer: Writer): void {
      const validators = message.validators;
      for (let i = 0; i < validators.length; ++i) {
        writer.uint32(10);
        writer.fork();
        tendermint.Validator.encode(validators[i], writer);
        writer.ldelim();
      }

      const proposer = message.proposer;
      if (proposer !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.Validator.encode(proposer, writer);
        writer.ldelim();
      }

      writer.uint32(24);
      writer.int64(message.total_voting_power);
    }

    static decode(reader: Reader, length: i32): ValidatorSet {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new ValidatorSet();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.validators.push(
              tendermint.Validator.decode(reader, reader.uint32())
            );
            break;

          case 2:
            message.proposer = tendermint.Validator.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.total_voting_power = reader.int64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    validators: Array<tendermint.Validator>;
    proposer: tendermint.Validator | null;
    total_voting_power: i64;

    constructor(
      validators: Array<tendermint.Validator> = [],
      proposer: tendermint.Validator | null = null,
      total_voting_power: i64 = 0
    ) {
      this.validators = validators;
      this.proposer = proposer;
      this.total_voting_power = total_voting_power;
    }
  }

  export class ValidatorUpdate {
    static encode(message: ValidatorUpdate, writer: Writer): void {
      const address = message.address;
      if (address !== null) {
        writer.uint32(10);
        writer.bytes(address);
      }

      const pub_key = message.pub_key;
      if (pub_key !== null) {
        writer.uint32(18);
        writer.fork();
        tendermint.PublicKey.encode(pub_key, writer);
        writer.ldelim();
      }

      writer.uint32(24);
      writer.int64(message.power);
    }

    static decode(reader: Reader, length: i32): ValidatorUpdate {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new ValidatorUpdate();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.address = reader.bytes();
            break;

          case 2:
            message.pub_key = tendermint.PublicKey.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.power = reader.int64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    address: Uint8Array | null;
    pub_key: tendermint.PublicKey | null;
    power: i64;

    constructor(
      address: Uint8Array | null = null,
      pub_key: tendermint.PublicKey | null = null,
      power: i64 = 0
    ) {
      this.address = address;
      this.pub_key = pub_key;
      this.power = power;
    }
  }

  @unmanaged
  export class VersionParams {
    static encode(message: VersionParams, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.app_version);
    }

    static decode(reader: Reader, length: i32): VersionParams {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new VersionParams();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.app_version = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    app_version: u64;

    constructor(app_version: u64 = 0) {
      this.app_version = app_version;
    }
  }

  export enum SignedMsgType {
    SIGNED_MSG_TYPE_UNKNOWN = 0,
    SIGNED_MSG_TYPE_PREVOTE = 1,
    SIGNED_MSG_TYPE_PRECOMMIT = 2,
    SIGNED_MSG_TYPE_PROPOSAL = 32,
  }

  export enum BlockIDFlag {
    BLOCK_ID_FLAG_UNKNOWN = 0,
    BLOCK_ID_FLAG_ABSENT = 1,
    BLOCK_ID_FLAG_COMMIT = 2,
    BLOCK_ID_FLAG_NIL = 3,
  }

  export function decodeEventData(a: Uint8Array): EventData {
    return Protobuf.decode<EventData>(a, EventData.decode);
  }

  export function decodeEventList(a: Uint8Array): EventList {
    return Protobuf.decode<EventList>(a, EventList.decode);
  }

  export function decodeReward(a: Uint8Array): Reward {
    return Protobuf.decode<Reward>(a, Reward.decode);
  }

  export function decodeBlock(a: Uint8Array): Block {
    return Protobuf.decode<Block>(a, Block.decode);
  }

  export function decodeBlockID(a: Uint8Array): BlockID {
    return Protobuf.decode<BlockID>(a, BlockID.decode);
  }

  export function decodeBlockParams(a: Uint8Array): BlockParams {
    return Protobuf.decode<BlockParams>(a, BlockParams.decode);
  }

  export function decodeCommit(a: Uint8Array): Commit {
    return Protobuf.decode<Commit>(a, Commit.decode);
  }

  export function decodeCommitSig(a: Uint8Array): CommitSig {
    return Protobuf.decode<CommitSig>(a, CommitSig.decode);
  }

  export function decodeConsensus(a: Uint8Array): Consensus {
    return Protobuf.decode<Consensus>(a, Consensus.decode);
  }

  export function decodeConsensusParams(a: Uint8Array): ConsensusParams {
    return Protobuf.decode<ConsensusParams>(a, ConsensusParams.decode);
  }

  export function decodeData(a: Uint8Array): Data {
    return Protobuf.decode<Data>(a, Data.decode);
  }

  export function decodeDuration(a: Uint8Array): Duration {
    return Protobuf.decode<Duration>(a, Duration.decode);
  }

  export function decodeDuplicateVoteEvidence(a: Uint8Array): DuplicateVoteEvidence {
    return Protobuf.decode<DuplicateVoteEvidence>(a, DuplicateVoteEvidence.decode);
  }

  export function decodeEvent(a: Uint8Array): Event {
    return Protobuf.decode<Event>(a, Event.decode);
  }

  export function decodeEventAttribute(a: Uint8Array): EventAttribute {
    return Protobuf.decode<EventAttribute>(a, EventAttribute.decode);
  }

  export function decodeEventBlock(a: Uint8Array): EventBlock {
    return Protobuf.decode<EventBlock>(a, EventBlock.decode);
  }

  export function decodeEventTx(a: Uint8Array): EventTx {
    return Protobuf.decode<EventTx>(a, EventTx.decode);
  }

  export function decodeEventValidatorSetUpdates(a: Uint8Array): EventValidatorSetUpdates {
    return Protobuf.decode<EventValidatorSetUpdates>(a, EventValidatorSetUpdates.decode);
  }

  export function decodeEventVote(a: Uint8Array): EventVote {
    return Protobuf.decode<EventVote>(a, EventVote.decode);
  }

  export function decodeEvidence(a: Uint8Array): Evidence {
    return Protobuf.decode<Evidence>(a, Evidence.decode);
  }

  export function decodeEvidenceList(a: Uint8Array): EvidenceList {
    return Protobuf.decode<EvidenceList>(a, EvidenceList.decode);
  }

  export function decodeEvidenceParams(a: Uint8Array): EvidenceParams {
    return Protobuf.decode<EvidenceParams>(a, EvidenceParams.decode);
  }

  export function decodeHeader(a: Uint8Array): Header {
    return Protobuf.decode<Header>(a, Header.decode);
  }

  export function decodeLightBlock(a: Uint8Array): LightBlock {
    return Protobuf.decode<LightBlock>(a, LightBlock.decode);
  }

  export function decodeLightClientAttackEvidence(a: Uint8Array): LightClientAttackEvidence {
    return Protobuf.decode<LightClientAttackEvidence>(a, LightClientAttackEvidence.decode);
  }

  export function decodePublicKey(a: Uint8Array): PublicKey {
    return Protobuf.decode<PublicKey>(a, PublicKey.decode);
  }

  export function decodePartSetHeader(a: Uint8Array): PartSetHeader {
    return Protobuf.decode<PartSetHeader>(a, PartSetHeader.decode);
  }

  export function decodeResponseBeginBlock(a: Uint8Array): ResponseBeginBlock {
    return Protobuf.decode<ResponseBeginBlock>(a, ResponseBeginBlock.decode);
  }

  export function decodeResponseEndBlock(a: Uint8Array): ResponseEndBlock {
    return Protobuf.decode<ResponseEndBlock>(a, ResponseEndBlock.decode);
  }

  export function decodeResponseDeliverTx(a: Uint8Array): ResponseDeliverTx {
    return Protobuf.decode<ResponseDeliverTx>(a, ResponseDeliverTx.decode);
  }

  export function decodeSignedHeader(a: Uint8Array): SignedHeader {
    return Protobuf.decode<SignedHeader>(a, SignedHeader.decode);
  }

  export function decodeTimestamp(a: Uint8Array): Timestamp {
    return Protobuf.decode<Timestamp>(a, Timestamp.decode);
  }

  export function decodeTxResult(a: Uint8Array): TxResult {
    return Protobuf.decode<TxResult>(a, TxResult.decode);
  }

  export function decodeValidator(a: Uint8Array): Validator {
    return Protobuf.decode<Validator>(a, Validator.decode);
  }

  export function decodeValidatorParams(a: Uint8Array): ValidatorParams {
    return Protobuf.decode<ValidatorParams>(a, ValidatorParams.decode);
  }

  export function decodeValidatorSet(a: Uint8Array): ValidatorSet {
    return Protobuf.decode<ValidatorSet>(a, ValidatorSet.decode);
  }

  export function decodeValidatorUpdate(a: Uint8Array): ValidatorUpdate {
    return Protobuf.decode<ValidatorUpdate>(a, ValidatorUpdate.decode);
  }

  export function decodeVersionParams(a: Uint8Array): VersionParams {
    return Protobuf.decode<VersionParams>(a, VersionParams.decode);
  }
}
