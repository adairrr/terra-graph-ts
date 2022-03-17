import { Writer, Reader, Protobuf } from 'as-proto'
import { Bytes } from '../../common/collections'

export namespace tendermint {
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

  export class EventList {
    public newBlock: EventBlock
    public transaction: Array<EventTx>
    public validatorSetUpdates: EventValidatorSetUpdates

    constructor(
      newBlock: EventBlock,
      transaction: Array<EventTx>,
      validatorSetUpdates: EventValidatorSetUpdates,
    ) {
      this.newBlock = newBlock
      this.transaction = transaction
      this.validatorSetUpdates = validatorSetUpdates
    }
  }

  export class EventData {
    public event: Event
    public block: EventBlock

    constructor(event: Event, block: EventBlock) {
      this.event = event
      this.block = block
    }
  }

  export class Block {
    public header: Header
    public data: Data
    public evidence: EvidenceList
    public lastCommit: Commit

    constructor(header: Header, data: Data, evidence: EvidenceList, lastCommit: Commit) {
      this.header = header
      this.data = data
      this.evidence = evidence
      this.lastCommit = lastCommit
    }
  }

  export class BlockID {
    public hash: Bytes
    public partSetHeader: PartSetHeader

    constructor(hash: Bytes, partSetHeader: PartSetHeader) {
      this.hash = hash
      this.partSetHeader = partSetHeader
    }
  }

  export class BlockParams {
    public maxBytes: i64
    public maxGas: i64

    constructor(maxBytes: i64, maxGas: i64) {
      this.maxBytes = maxBytes
      this.maxGas = maxGas
    }
  }

  export class Commit {
    public height: i64
    public round: i32
    public blockId: BlockID
    public signatures: Array<CommitSig>

    constructor(height: i64, round: i32, blockId: BlockID, signatures: Array<CommitSig>) {
      this.height = height
      this.round = round
      this.blockId = blockId
      this.signatures = signatures
    }
  }

  export class CommitSig {
    public blockIdFlag: BlockIDFlag
    public validatorAddress: Bytes
    public timestamp: Timestamp
    public signature: Bytes

    constructor(
      blockIdFlag: BlockIDFlag,
      validatorAddress: Bytes,
      timestamp: Timestamp,
      signature: Bytes,
    ) {
      this.blockIdFlag = blockIdFlag
      this.validatorAddress = validatorAddress
      this.timestamp = timestamp
      this.signature = signature
    }
  }

  export class Consensus {
    public block: u64
    public app: u64

    constructor(block: u64, app: u64) {
      this.block = block
      this.app = app
    }
  }

  export class ConsensusParams {
    public block: BlockParams
    public evidence: EvidenceParams
    public validator: ValidatorParams
    public version: VersionParams

    constructor(
      block: BlockParams,
      evidence: EvidenceParams,
      validator: ValidatorParams,
      version: VersionParams,
    ) {
      this.block = block
      this.evidence = evidence
      this.validator = validator
      this.version = version
    }
  }

  export class Data {
    public txs: Array<Bytes>

    constructor(txs: Array<Bytes>) {
      this.txs = txs
    }
  }

  export class Duration {
    public seconds: i64
    public nanos: i32

    constructor(seconds: i64, nanos: i32) {
      this.seconds = seconds
      this.nanos = nanos
    }
  }

  export class DuplicateVoteEvidence {
    public voteA: EventVote
    public voteB: EventVote
    public totalVotingPower: i64
    public validatorPower: i64
    public timestamp: Timestamp

    constructor(
      voteA: EventVote,
      voteB: EventVote,
      totalVotingPower: i64,
      validatorPower: i64,
      timestamp: Timestamp,
    ) {
      this.voteA = voteA
      this.voteB = voteB
      this.totalVotingPower = totalVotingPower
      this.validatorPower = validatorPower
      this.timestamp = timestamp
    }
  }

  export class Event {
    public eventType: string
    public attributes: Array<EventAttribute>

    constructor(eventType: string, attributes: Array<EventAttribute>) {
      this.eventType = eventType
      this.attributes = attributes
    }
  }

  export class EventAttribute {
    public key: string
    public value: string
    public index: bool

    constructor(key: string, value: string, index: bool) {
      this.key = key
      this.value = value
      this.index = index
    }
  }

  export class EventBlock {
    public block: Block
    public blockId: BlockID
    public resultBeginBlock: ResponseBeginBlock
    public resultEndBlock: ResponseEndBlock

    constructor(
      block: Block,
      blockId: BlockID,
      resultBeginBlock: ResponseBeginBlock,
      resultEndBlock: ResponseEndBlock,
    ) {
      this.block = block
      this.blockId = blockId
      this.resultBeginBlock = resultBeginBlock
      this.resultEndBlock = resultEndBlock
    }
  }

  export class EventTx {
    public txResult: TxResult

    constructor(txResult: TxResult) {
      this.txResult = txResult
    }
  }

  export class EventValidatorSetUpdates {
    public validatorUpdates: Array<Validator>

    constructor(validatorUpdates: Array<Validator>) {
      this.validatorUpdates = validatorUpdates
    }
  }

  export class EventVote {
    public eventVoteType: SignedMsgType
    public height: u64
    public round: i32
    public blockId: BlockID
    public timestamp: Timestamp
    public validatorAddress: Bytes
    public validatorIndex: i32
    public signature: Bytes

    constructor(
      eventVoteType: SignedMsgType,
      height: u64,
      round: i32,
      blockId: BlockID,
      timestamp: Timestamp,
      validatorAddress: Bytes,
      validatorIndex: i32,
      signature: Bytes,
    ) {
      this.eventVoteType = eventVoteType
      this.height = height
      this.round = round
      this.blockId = blockId
      this.timestamp = timestamp
      this.validatorAddress = validatorAddress
      this.validatorIndex = validatorIndex
      this.signature = signature
    }
  }

  export class Evidence {
    public duplicateVoteEvidence: DuplicateVoteEvidence
    public lightClientAttackEvidence: LightClientAttackEvidence

    constructor(
      duplicateVoteEvidence: DuplicateVoteEvidence,
      lightClientAttackEvidence: LightClientAttackEvidence,
    ) {
      this.duplicateVoteEvidence = duplicateVoteEvidence
      this.lightClientAttackEvidence = lightClientAttackEvidence
    }
  }

  export class EvidenceList {
    public evidence: Array<Evidence>

    constructor(evidence: Array<Evidence>) {
      this.evidence = evidence
    }
  }

  export class EvidenceParams {
    public maxAgeNumBlocks: i64
    public maxAgeDuration: Duration
    public maxBytes: i64

    constructor(maxAgeNumBlocks: i64, maxAgeDuration: Duration, maxBytes: i64) {
      this.maxAgeNumBlocks = maxAgeNumBlocks
      this.maxAgeDuration = maxAgeDuration
      this.maxBytes = maxBytes
    }
  }

  export class Header {
    public version: Consensus
    public chainId: string
    public height: u64
    public time: Timestamp
    public lastBlockId: BlockID
    public lastCommitHash: Bytes
    public dataHash: Bytes
    public validatorsHash: Bytes
    public nextValidatorsHash: Bytes
    public consensusHash: Bytes
    public appHash: Bytes
    public lastResultsHash: Bytes
    public evidenceHash: Bytes
    public proposerAddress: Bytes

    constructor(
      version: Consensus,
      chainId: string,
      height: u64,
      time: Timestamp,
      lastBlockId: BlockID,
      lastCommitHash: Bytes,
      dataHash: Bytes,
      validatorsHash: Bytes,
      nextValidatorsHash: Bytes,
      consensusHash: Bytes,
      appHash: Bytes,
      lastResultsHash: Bytes,
      evidenceHash: Bytes,
      proposerAddress: Bytes,
    ) {
      this.version = version
      this.chainId = chainId
      this.height = height
      this.time = time
      this.lastBlockId = lastBlockId
      this.lastCommitHash = lastCommitHash
      this.dataHash = dataHash
      this.validatorsHash = validatorsHash
      this.nextValidatorsHash = nextValidatorsHash
      this.consensusHash = consensusHash
      this.appHash = appHash
      this.lastResultsHash = lastResultsHash
      this.evidenceHash = evidenceHash
      this.proposerAddress = proposerAddress
    }
  }

  export class LightBlock {
    public signedHeader: SignedHeader
    public validatorSet: ValidatorSet

    constructor(signedHeader: SignedHeader, validatorSet: ValidatorSet) {
      this.signedHeader = signedHeader
      this.validatorSet = validatorSet
    }
  }

  export class LightClientAttackEvidence {
    public conflictingBlock: LightBlock
    public commonHeight: i64
    public byzantineValidators: Array<Validator>
    public totalVotingPower: i64
    public timestamp: Timestamp

    constructor(
      conflictingBlock: LightBlock,
      commonHeight: i64,
      byzantineValidators: Array<Validator>,
      totalVotingPower: i64,
      timestamp: Timestamp,
    ) {
      this.conflictingBlock = conflictingBlock
      this.commonHeight = commonHeight
      this.byzantineValidators = byzantineValidators
      this.totalVotingPower = totalVotingPower
      this.timestamp = timestamp
    }
  }

  export class PublicKey {
    public ed25519: Bytes
    public secp256k1: Bytes

    constructor(ed25519: Bytes, secp256k1: Bytes) {
      this.ed25519 = ed25519
      this.secp256k1 = secp256k1
    }
  }

  export class PartSetHeader {
    public total: u32
    public hash: Bytes

    constructor(total: u32, hash: Bytes) {
      this.total = total
      this.hash = hash
    }
  }

  export class ResponseBeginBlock {
    public events: Array<Event>

    constructor(events: Array<Event>) {
      this.events = events
    }
  }

  export class ResponseEndBlock {
    public validatorUpdates: Array<ValidatorUpdate>
    public consensusParamUpdates: ConsensusParams
    public events: Array<Event>

    constructor(
      validatorUpdates: Array<ValidatorUpdate>,
      consensusParamUpdates: ConsensusParams,
      events: Array<Event>,
    ) {
      this.validatorUpdates = validatorUpdates
      this.consensusParamUpdates = consensusParamUpdates
      this.events = events
    }
  }

  export class ResponseDeliverTx {
    public code: u32
    public data: Bytes
    public log: string
    public info: string
    public gasWanted: i64
    public gasUsed: i64
    public events: Array<Event>
    public codespace: string

    constructor(
      code: u32,
      data: Bytes,
      log: string,
      info: string,
      gasWanted: i64,
      gasUsed: i64,
      events: Array<Event>,
      codespace: string,
    ) {
      this.code = code
      this.data = data
      this.log = log
      this.info = info
      this.gasWanted = gasWanted
      this.gasUsed = gasUsed
      this.events = events
      this.codespace = codespace
    }
  }

  export class SignedHeader {
    public header: Header
    public commit: Commit

    constructor(header: Header, commit: Commit) {
      this.header = header
      this.commit = commit
    }
  }

  export class Timestamp {
    public seconds: i64
    public nanos: i32

    constructor(seconds: i64, nanos: i32) {
      this.seconds = seconds
      this.nanos = nanos
    }
  }

  export class TxResult {
    public height: u64
    public index: u32
    public tx: Bytes
    public result: ResponseDeliverTx

    constructor(height: u64, index: u32, tx: Bytes, result: ResponseDeliverTx) {
      this.height = height
      this.index = index
      this.tx = tx
      this.result = result
    }
  }

  export class Validator {
    public address: Bytes
    public pubKey: PublicKey
    public votingPower: i64
    public proposerPriority: i64

    constructor(
      address: Bytes,
      pubKey: PublicKey,
      votingPower: i64,
      proposerPriority: i64,
    ) {
      this.address = address
      this.pubKey = pubKey
      this.votingPower = votingPower
      this.proposerPriority = proposerPriority
    }
  }

  export class ValidatorParams {
    public pubKeyTypes: Array<string>

    constructor(pubKeyTypes: Array<string>) {
      this.pubKeyTypes = pubKeyTypes
    }
  }

  export class ValidatorSet {
    public validators: Array<Validator>
    public proposer: Validator
    public totalVotingPower: i64

    constructor(
      validators: Array<Validator>,
      proposer: Validator,
      totalVotingPower: i64,
    ) {
      this.validators = validators
      this.proposer = proposer
      this.totalVotingPower = totalVotingPower
    }
  }

  export class ValidatorUpdate {
    public address: Bytes
    public pubKey: PublicKey
    public power: i64

    constructor(address: Bytes, pubKey: PublicKey, power: i64) {
      this.address = address
      this.pubKey = pubKey
      this.power = power
    }
  }

  export class VersionParams {
    public appVersion: u64

    constructor(appVersion: u64) {
      this.appVersion = appVersion
    }
  }

  export namespace v1 {
    export class BlockID {
      static encode(message: BlockID, writer: Writer): void {
        const hash = message.hash
        if (hash !== null) {
          writer.uint32(10)
          writer.bytes(hash)
        }

        const part_set_header = message.part_set_header
        if (part_set_header !== null) {
          writer.uint32(18)
          writer.fork()
          tendermint.v1.PartSetHeader.encode(part_set_header, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): BlockID {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new BlockID()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.hash = reader.bytes()
              break

            case 2:
              message.part_set_header = tendermint.v1.PartSetHeader.decode(
                reader,
                reader.uint32(),
              )
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      hash: Uint8Array | null
      part_set_header: tendermint.v1.PartSetHeader | null

      constructor(
        hash: Uint8Array | null = null,
        part_set_header: tendermint.v1.PartSetHeader | null = null,
      ) {
        this.hash = hash
        this.part_set_header = part_set_header
      }
    }
    export class Commit {
      static encode(message: Commit, writer: Writer): void {
        writer.uint32(8)
        writer.int64(message.height)

        writer.uint32(16)
        writer.int32(message.round)

        const block_id = message.block_id
        if (block_id !== null) {
          writer.uint32(26)
          writer.fork()
          tendermint.v1.BlockID.encode(block_id, writer)
          writer.ldelim()
        }

        const signatures = message.signatures
        for (let i = 0; i < signatures.length; ++i) {
          writer.uint32(34)
          writer.fork()
          tendermint.v1.CommitSig.encode(signatures[i], writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): Commit {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Commit()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.height = reader.int64()
              break

            case 2:
              message.round = reader.int32()
              break

            case 3:
              message.block_id = tendermint.v1.BlockID.decode(reader, reader.uint32())
              break

            case 4:
              message.signatures.push(
                tendermint.v1.CommitSig.decode(reader, reader.uint32()),
              )
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      height: i64
      round: i32
      block_id: tendermint.v1.BlockID | null
      signatures: Array<tendermint.v1.CommitSig>

      constructor(
        height: i64 = 0,
        round: i32 = 0,
        block_id: tendermint.v1.BlockID | null = null,
        signatures: Array<tendermint.v1.CommitSig> = [],
      ) {
        this.height = height
        this.round = round
        this.block_id = block_id
        this.signatures = signatures
      }
    }

    export class CommitSig {
      static encode(message: CommitSig, writer: Writer): void {
        writer.uint32(8)
        writer.int32(message.block_id_flag)

        const validator_address = message.validator_address
        if (validator_address !== null) {
          writer.uint32(18)
          writer.bytes(validator_address)
        }

        const timestamp = message.timestamp
        if (timestamp !== null) {
          writer.uint32(26)
          writer.fork()
          tendermint.v1.Timestamp.encode(timestamp, writer)
          writer.ldelim()
        }

        const signature = message.signature
        if (signature !== null) {
          writer.uint32(34)
          writer.bytes(signature)
        }
      }

      static decode(reader: Reader, length: i32): CommitSig {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new CommitSig()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.block_id_flag = reader.int32()
              break

            case 2:
              message.validator_address = reader.bytes()
              break

            case 3:
              message.timestamp = tendermint.v1.Timestamp.decode(reader, reader.uint32())
              break

            case 4:
              message.signature = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      block_id_flag: tendermint.v1.BlockIDFlag
      validator_address: Uint8Array | null
      timestamp: tendermint.v1.Timestamp | null
      signature: Uint8Array | null

      constructor(
        block_id_flag: tendermint.v1.BlockIDFlag = 0,
        validator_address: Uint8Array | null = null,
        timestamp: tendermint.v1.Timestamp | null = null,
        signature: Uint8Array | null = null,
      ) {
        this.block_id_flag = block_id_flag
        this.validator_address = validator_address
        this.timestamp = timestamp
        this.signature = signature
      }
    }

    @unmanaged
    export class Consensus {
      static encode(message: Consensus, writer: Writer): void {
        writer.uint32(8)
        writer.uint64(message.block)

        writer.uint32(16)
        writer.uint64(message.app)
      }

      static decode(reader: Reader, length: i32): Consensus {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Consensus()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.block = reader.uint64()
              break

            case 2:
              message.app = reader.uint64()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      block: u64
      app: u64

      constructor(block: u64 = 0, app: u64 = 0) {
        this.block = block
        this.app = app
      }
    }
    export class Header {
      static encode(message: Header, writer: Writer): void {
        const version = message.version
        if (version !== null) {
          writer.uint32(10)
          writer.fork()
          tendermint.v1.Consensus.encode(version, writer)
          writer.ldelim()
        }

        const chain_id = message.chain_id
        if (chain_id !== null) {
          writer.uint32(18)
          writer.string(chain_id)
        }

        writer.uint32(24)
        writer.uint64(message.height)

        const time = message.time
        if (time !== null) {
          writer.uint32(34)
          writer.fork()
          tendermint.v1.Timestamp.encode(time, writer)
          writer.ldelim()
        }

        const last_block_id = message.last_block_id
        if (last_block_id !== null) {
          writer.uint32(42)
          writer.fork()
          tendermint.v1.BlockID.encode(last_block_id, writer)
          writer.ldelim()
        }

        const last_commit_hash = message.last_commit_hash
        if (last_commit_hash !== null) {
          writer.uint32(50)
          writer.bytes(last_commit_hash)
        }

        const data_hash = message.data_hash
        if (data_hash !== null) {
          writer.uint32(58)
          writer.bytes(data_hash)
        }

        const validators_hash = message.validators_hash
        if (validators_hash !== null) {
          writer.uint32(66)
          writer.bytes(validators_hash)
        }

        const next_validators_hash = message.next_validators_hash
        if (next_validators_hash !== null) {
          writer.uint32(74)
          writer.bytes(next_validators_hash)
        }

        const consensus_hash = message.consensus_hash
        if (consensus_hash !== null) {
          writer.uint32(82)
          writer.bytes(consensus_hash)
        }

        const app_hash = message.app_hash
        if (app_hash !== null) {
          writer.uint32(90)
          writer.bytes(app_hash)
        }

        const last_results_hash = message.last_results_hash
        if (last_results_hash !== null) {
          writer.uint32(98)
          writer.bytes(last_results_hash)
        }

        const evidence_hash = message.evidence_hash
        if (evidence_hash !== null) {
          writer.uint32(106)
          writer.bytes(evidence_hash)
        }

        const proposer_address = message.proposer_address
        if (proposer_address !== null) {
          writer.uint32(114)
          writer.bytes(proposer_address)
        }
      }

      static decode(reader: Reader, length: i32): Header {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Header()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.version = tendermint.v1.Consensus.decode(reader, reader.uint32())
              break

            case 2:
              message.chain_id = reader.string()
              break

            case 3:
              message.height = reader.uint64()
              break

            case 4:
              message.time = tendermint.v1.Timestamp.decode(reader, reader.uint32())
              break

            case 5:
              message.last_block_id = tendermint.v1.BlockID.decode(
                reader,
                reader.uint32(),
              )
              break

            case 6:
              message.last_commit_hash = reader.bytes()
              break

            case 7:
              message.data_hash = reader.bytes()
              break

            case 8:
              message.validators_hash = reader.bytes()
              break

            case 9:
              message.next_validators_hash = reader.bytes()
              break

            case 10:
              message.consensus_hash = reader.bytes()
              break

            case 11:
              message.app_hash = reader.bytes()
              break

            case 12:
              message.last_results_hash = reader.bytes()
              break

            case 13:
              message.evidence_hash = reader.bytes()
              break

            case 14:
              message.proposer_address = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      version: tendermint.v1.Consensus | null
      chain_id: string | null
      height: u64
      time: tendermint.v1.Timestamp | null
      last_block_id: tendermint.v1.BlockID | null
      last_commit_hash: Uint8Array | null
      data_hash: Uint8Array | null
      validators_hash: Uint8Array | null
      next_validators_hash: Uint8Array | null
      consensus_hash: Uint8Array | null
      app_hash: Uint8Array | null
      last_results_hash: Uint8Array | null
      evidence_hash: Uint8Array | null
      proposer_address: Uint8Array | null

      constructor(
        version: tendermint.v1.Consensus | null = null,
        chain_id: string | null = null,
        height: u64 = 0,
        time: tendermint.v1.Timestamp | null = null,
        last_block_id: tendermint.v1.BlockID | null = null,
        last_commit_hash: Uint8Array | null = null,
        data_hash: Uint8Array | null = null,
        validators_hash: Uint8Array | null = null,
        next_validators_hash: Uint8Array | null = null,
        consensus_hash: Uint8Array | null = null,
        app_hash: Uint8Array | null = null,
        last_results_hash: Uint8Array | null = null,
        evidence_hash: Uint8Array | null = null,
        proposer_address: Uint8Array | null = null,
      ) {
        this.version = version
        this.chain_id = chain_id
        this.height = height
        this.time = time
        this.last_block_id = last_block_id
        this.last_commit_hash = last_commit_hash
        this.data_hash = data_hash
        this.validators_hash = validators_hash
        this.next_validators_hash = next_validators_hash
        this.consensus_hash = consensus_hash
        this.app_hash = app_hash
        this.last_results_hash = last_results_hash
        this.evidence_hash = evidence_hash
        this.proposer_address = proposer_address
      }
    }

    export class PublicKey {
      static encode(message: PublicKey, writer: Writer): void {
        const ed25519 = message.ed25519
        if (ed25519 !== null) {
          writer.uint32(10)
          writer.bytes(ed25519)
        }

        const secp256k1 = message.secp256k1
        if (secp256k1 !== null) {
          writer.uint32(18)
          writer.bytes(secp256k1)
        }
      }

      static decode(reader: Reader, length: i32): PublicKey {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new PublicKey()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.ed25519 = reader.bytes()
              break

            case 2:
              message.secp256k1 = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      ed25519: Uint8Array | null
      secp256k1: Uint8Array | null

      constructor(
        ed25519: Uint8Array | null = null,
        secp256k1: Uint8Array | null = null,
      ) {
        this.ed25519 = ed25519
        this.secp256k1 = secp256k1
      }
    }

    export class PartSetHeader {
      static encode(message: PartSetHeader, writer: Writer): void {
        writer.uint32(8)
        writer.uint32(message.total)

        const hash = message.hash
        if (hash !== null) {
          writer.uint32(18)
          writer.bytes(hash)
        }
      }

      static decode(reader: Reader, length: i32): PartSetHeader {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new PartSetHeader()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.total = reader.uint32()
              break

            case 2:
              message.hash = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      total: u32
      hash: Uint8Array | null

      constructor(total: u32 = 0, hash: Uint8Array | null = null) {
        this.total = total
        this.hash = hash
      }
    }

    export class SignedHeader {
      static encode(message: SignedHeader, writer: Writer): void {
        const header = message.header
        if (header !== null) {
          writer.uint32(10)
          writer.fork()
          tendermint.v1.Header.encode(header, writer)
          writer.ldelim()
        }

        const commit = message.commit
        if (commit !== null) {
          writer.uint32(18)
          writer.fork()
          tendermint.v1.Commit.encode(commit, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): SignedHeader {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new SignedHeader()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.header = tendermint.v1.Header.decode(reader, reader.uint32())
              break

            case 2:
              message.commit = tendermint.v1.Commit.decode(reader, reader.uint32())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      header: tendermint.v1.Header | null
      commit: tendermint.v1.Commit | null

      constructor(
        header: tendermint.v1.Header | null = null,
        commit: tendermint.v1.Commit | null = null,
      ) {
        this.header = header
        this.commit = commit
      }
    }

    @unmanaged
    export class Timestamp {
      static encode(message: Timestamp, writer: Writer): void {
        writer.uint32(8)
        writer.int64(message.seconds)

        writer.uint32(16)
        writer.int32(message.nanos)
      }

      static decode(reader: Reader, length: i32): Timestamp {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Timestamp()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.seconds = reader.int64()
              break

            case 2:
              message.nanos = reader.int32()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      seconds: i64
      nanos: i32

      constructor(seconds: i64 = 0, nanos: i32 = 0) {
        this.seconds = seconds
        this.nanos = nanos
      }
    }
    export class Validator {
      static encode(message: Validator, writer: Writer): void {
        const address = message.address
        if (address !== null) {
          writer.uint32(10)
          writer.bytes(address)
        }

        const pub_key = message.pub_key
        if (pub_key !== null) {
          writer.uint32(18)
          writer.fork()
          tendermint.v1.PublicKey.encode(pub_key, writer)
          writer.ldelim()
        }

        writer.uint32(24)
        writer.int64(message.voting_power)

        writer.uint32(32)
        writer.int64(message.proposer_priority)
      }

      static decode(reader: Reader, length: i32): Validator {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Validator()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.address = reader.bytes()
              break

            case 2:
              message.pub_key = tendermint.v1.PublicKey.decode(reader, reader.uint32())
              break

            case 3:
              message.voting_power = reader.int64()
              break

            case 4:
              message.proposer_priority = reader.int64()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      address: Uint8Array | null
      pub_key: tendermint.v1.PublicKey | null
      voting_power: i64
      proposer_priority: i64

      constructor(
        address: Uint8Array | null = null,
        pub_key: tendermint.v1.PublicKey | null = null,
        voting_power: i64 = 0,
        proposer_priority: i64 = 0,
      ) {
        this.address = address
        this.pub_key = pub_key
        this.voting_power = voting_power
        this.proposer_priority = proposer_priority
      }
    }

    export class ValidatorSet {
      static encode(message: ValidatorSet, writer: Writer): void {
        const validators = message.validators
        for (let i = 0; i < validators.length; ++i) {
          writer.uint32(10)
          writer.fork()
          tendermint.v1.Validator.encode(validators[i], writer)
          writer.ldelim()
        }

        const proposer = message.proposer
        if (proposer !== null) {
          writer.uint32(18)
          writer.fork()
          tendermint.v1.Validator.encode(proposer, writer)
          writer.ldelim()
        }

        writer.uint32(24)
        writer.int64(message.total_voting_power)
      }

      static decode(reader: Reader, length: i32): ValidatorSet {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new ValidatorSet()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.validators.push(
                tendermint.v1.Validator.decode(reader, reader.uint32()),
              )
              break

            case 2:
              message.proposer = tendermint.v1.Validator.decode(reader, reader.uint32())
              break

            case 3:
              message.total_voting_power = reader.int64()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      validators: Array<tendermint.v1.Validator>
      proposer: tendermint.v1.Validator | null
      total_voting_power: i64

      constructor(
        validators: Array<tendermint.v1.Validator> = [],
        proposer: tendermint.v1.Validator | null = null,
        total_voting_power: i64 = 0,
      ) {
        this.validators = validators
        this.proposer = proposer
        this.total_voting_power = total_voting_power
      }
    }

    export enum BlockIDFlag {
      BLOCK_ID_FLAG_UNKNOWN = 0,
      BLOCK_ID_FLAG_ABSENT = 1,
      BLOCK_ID_FLAG_COMMIT = 2,
      BLOCK_ID_FLAG_NIL = 3,
    }

    export function decodeBlockID(a: Uint8Array): BlockID {
      return Protobuf.decode<BlockID>(a, BlockID.decode)
    }

    export function decodeCommit(a: Uint8Array): Commit {
      return Protobuf.decode<Commit>(a, Commit.decode)
    }

    export function decodeCommitSig(a: Uint8Array): CommitSig {
      return Protobuf.decode<CommitSig>(a, CommitSig.decode)
    }

    export function decodeConsensus(a: Uint8Array): Consensus {
      return Protobuf.decode<Consensus>(a, Consensus.decode)
    }

    export function decodeHeader(a: Uint8Array): Header {
      return Protobuf.decode<Header>(a, Header.decode)
    }

    export function decodePublicKey(a: Uint8Array): PublicKey {
      return Protobuf.decode<PublicKey>(a, PublicKey.decode)
    }

    export function decodePartSetHeader(a: Uint8Array): PartSetHeader {
      return Protobuf.decode<PartSetHeader>(a, PartSetHeader.decode)
    }

    export function decodeSignedHeader(a: Uint8Array): SignedHeader {
      return Protobuf.decode<SignedHeader>(a, SignedHeader.decode)
    }

    export function decodeTimestamp(a: Uint8Array): Timestamp {
      return Protobuf.decode<Timestamp>(a, Timestamp.decode)
    }

    export function decodeValidator(a: Uint8Array): Validator {
      return Protobuf.decode<Validator>(a, Validator.decode)
    }

    export function decodeValidatorSet(a: Uint8Array): ValidatorSet {
      return Protobuf.decode<ValidatorSet>(a, ValidatorSet.decode)
    }
  }
}
