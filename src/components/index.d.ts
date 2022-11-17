import Vue from "vue";

declare class VirtualList extends Vue {
  data: any[];
  dataKey: string;
  itemHeight: number;
  dataBuffer: number;
  showLoading: boolean;
  onCompelete: () => void;
}

export { VirtualList };